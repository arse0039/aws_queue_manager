
const QueueCount = ({count}:{count: number}) => {
    return (
        <div className="flex flex-col justify-start items-center">  
            <h1 className="text-8xl">{count}</h1>
            {count === 1 ? <p>Student in the queue</p> : <p>Students in the queue</p>}
        </div>
    )
}

export default QueueCount;

