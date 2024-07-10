import { StudentData } from "@/lib/definitions";
import { sendTeamsMessage } from "@/utils/graphservice";

const CurrentStudent = ({queueData}:{queueData:StudentData}) => {

    const generateTeamsDeepLink = (email: string) => {
        const encodedEmail = encodeURIComponent(email);
        const message = encodeURIComponent("Your turn for office hours has arrived. Please join the session.");
        return `https://teams.microsoft.com/l/chat/0/0?users=${encodedEmail}&message=${message}`;
    };

    const handleOpenTeamsChat = () => {
        const deepLink = generateTeamsDeepLink(queueData.email);
        window.open(deepLink, '_blank');
    };

    return( 
        <div className="flex flex-col justify-center items-center m-5">
            <h1 className="text-4xl p-2">Current Student</h1>
            <h1 className="text-2xl p-2">{queueData.firstName} {queueData.lastName}</h1>
            <p className="p-2"> {queueData.description}</p>
            <button className='btn m-2' onClick={handleOpenTeamsChat}> Send Message</button>
        </div>
    )
}

export default CurrentStudent;