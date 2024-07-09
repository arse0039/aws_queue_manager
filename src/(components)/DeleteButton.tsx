import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { StudentData } from "@/lib/definitions";

interface DeleteButtonProps {
    queueData:StudentData
    refresh: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteButton = ({ queueData, refresh} :DeleteButtonProps) => {
  const { user } = useAuthenticator((context) => [context.user]);

  const handleDelete = async () => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    const data = {
      sessionID: queueData.sessionID,
      userID: queueData.userID
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/queueManager/`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": idToken?.toString() ?? ""
      }
    });
    if (res.ok) {
      refresh((prev) => !prev);
    }else{
      console.error("Error deleting item:", res.statusText);
    }
  }

    return(
        <div className="flex flex-col justify-center items-center m-5">
            <button className='btn-delete m-2' onClick={handleDelete}> On to the next student! </button>
        </div>
    )
}

export default DeleteButton;