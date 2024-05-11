type GetUserParams = { email: string; password: string };

async function getUser({ email, password }: GetUserParams) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw new Error("Could not log in. Something went wrong!");
  return data;
}

export { getUser };
