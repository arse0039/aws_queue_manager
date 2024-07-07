import {useEffect, useState} from 'react';

interface Options {
    method: string;
    headers: { "Content-Type": "application/json" };
}

export const useDataFetching = <T> (
    url:string, options:Options, dependencyArray:any[]
) => {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const getData = await fetch(url, options);
            const getDataJson: T = await getData.json();
            setData(getDataJson);
            } catch (error) {
            console.error("Error fetching data", error);
            } 
        };
        fetchData();
        }, [...dependencyArray]);
    
    return data;
}