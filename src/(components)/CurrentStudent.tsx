import { StudentData } from "@/lib/definitions";

const CurrentStudent = ({queueData}:{queueData:StudentData}) => {
        return( 
            <div className="flex flex-col justify-center items-center m-5">
                <h1 className="text-4xl p-2">Current Student</h1>
                <h1 className="text-2xl p-2">{queueData.firstName} {queueData.lastName}</h1>
                <p className="p-2 break-all overflow-hidden"> {queueData.description}</p>
                <button className='btn m-2'> Send Message</button>
            </div>
        )
}

export default CurrentStudent;