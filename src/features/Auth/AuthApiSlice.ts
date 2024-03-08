import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../services/supabase";
import { Session, User } from "@supabase/supabase-js";

type getUserDataResultType =
  | {
      user: User | null;
      session: Session | null;
    }
  | {
      user: null;
      session: null;
    };
type getUserDataArgsType = { email: string; password: string };

export const authApiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getUserData: build.query<getUserDataResultType, getUserDataArgsType>({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        console.log(error);
        return { data };
      },
    }),
  }),
});

export const { useGetUserDataQuery } = authApiSlice;
