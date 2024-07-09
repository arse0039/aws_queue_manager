import { StudentData } from "@/lib/definitions";

interface DeleteButtonProps {
    queueData:StudentData
    refresh: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteButton = ({ queueData, refresh} :DeleteButtonProps) => {

    const handleDelete = async () => {
        const data = {
            sessionID: queueData.sessionID,
            userID: queueData.userID
          }
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/queueManager/`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
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