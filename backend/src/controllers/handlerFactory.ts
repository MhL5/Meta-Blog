/**
 * This code snippet exports several functions for CRUD operations on a given model.
 *
 * - `deleteOne`: Deletes a document with the specified ID from the model.
 * - `updateOne`: Updates a document with the specified ID in the model.
 * - `createOne`: Creates a new document in the model.
 * - `getOne`: Retrieves a document with the specified ID from the model.
 * - `getAll`: Retrieves all documents from the model, with optional filtering, sorting, field selection, and pagination.
 *
 * Each function is wrapped in a `catchAsyncMiddleware` function to handle any errors that may occur during the asynchronous operations.
 *
 * @param FactoryModel The model to perform the CRUD operations on.
 * @param popOptions Optional. The population options for the `getOne` function.
 * @exports CRUD functions for operations.
 */

import APIfeatures from "../utils/apiFeatures";
import { AppError } from "../utils/appError";
import { catchAsyncMiddleware } from "../utils/catchAsync";
import { Model, PopulateOptions } from "mongoose";

const deleteOne = <K>(FactoryModel: Model<K>) => {
  return catchAsyncMiddleware(async (req, res, next) => {
    const doc = await FactoryModel.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.sendStatus(204);
  });
};

const updateOne = <K>(FactoryModel: Model<K>) => {
  return catchAsyncMiddleware(async (req, res, next) => {
    const doc = await FactoryModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

const createOne = <K>(FactoryModel: Model<K>) => {
  return catchAsyncMiddleware(async (req, res, next) => {
    const newDoc = await FactoryModel.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  });
};

const getOne = <K>(
  FactoryModel: Model<K>,
  popOptions?: PopulateOptions | (string | PopulateOptions)[]
) => {
  return catchAsyncMiddleware(async (req, res, next) => {
    const { id } = req.params;

    let query = FactoryModel.findById(id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (id && id?.length > 24)
      return next(new AppError("No document found with that ID", 404));

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

const getAll = <K>(FactoryModel: Model<K>) => {
  return catchAsyncMiddleware(async (req, res, next) => {
    //TODO: Fixing this workaround
    // To allow for nested route reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIfeatures(FactoryModel.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    if (!doc)
      return next(new AppError("Something went wrong! please try again", 500));

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
};

export { getAll, deleteOne, updateOne, createOne, getOne };
