import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
function ClientRow({ client: { id, name, email, phone } }) {
  const [deleteClient] = useMutation(DELETE_CLIENT);
  const handleDelete = () => {
    deleteClient({
      variables: { id: id },
      refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    });
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default ClientRow;
