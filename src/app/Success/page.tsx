"use client"
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
    const params = useSearchParams();
    const queuePosition = params.get('queuePosition');

    return (
        <div>
            <h1>GREAT SUCCESS</h1>
            {queuePosition === '1' ? <p>There is {queuePosition} student ahead of you in the queue!</p> :<p>There are {queuePosition} students ahead of you in the queue!</p>}
            <p> The TA will reach out to you via Teams once it is your turn. Thank you for your patience!</p>
        </div>
    )
}

export default SuccessPage;