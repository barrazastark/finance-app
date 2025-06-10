import Form from "./Form";
import { fetchIntitutions } from "./actions";

export default async function Page() {
  const institutions = await fetchIntitutions();

  return (
    <Form institutions={institutions} />
  );
}
