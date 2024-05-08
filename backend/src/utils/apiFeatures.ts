import { Query } from "mongoose";

interface QueryString {
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
}

// <ResultType, DocType>
class APIfeatures<DocType> {
  //* mongoose offers this functional way which we didn't use:
  //* const query = await Tour.find().where("duration").gte(5).where("difficulty").equals("easy");
  constructor(
    public query: Query<DocType[], DocType>,
    public queryString: QueryString
  ) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // A.filtering
    const queryObj: { [key: string]: string } = { ...this.queryString };
    const excludedQueries = ["page", "sort", "limit", "fields"];
    excludedQueries.forEach((el) => delete queryObj[el]);

    // B.advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // A. sorting based on sort query if it exist
    if (this.queryString.sort)
      this.query = this.query.sort(this.queryString.sort.replaceAll(",", " "));
    // TODO
    // BUGGY CODE MIGHT FIX LATER - MAKES PAGINATION RESULT TO RETURN THE WRONG DATA
    // else this.query = this.query.sort("-createdAt");

    return this;
  }

  limitFields() {
    let fieldsQuery;
    if (this.queryString.fields) fieldsQuery = this.queryString.fields;

    if (fieldsQuery)
      this.query = this.query.select(fieldsQuery.replaceAll(",", " "));
    else this.query = this.query.select("-__v");

    return this;
  }

  paginate() {
    const page = (this?.queryString?.page && +this?.queryString?.page) || 1;
    const limit =
      (this?.queryString?.limit && +this?.queryString?.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIfeatures;
