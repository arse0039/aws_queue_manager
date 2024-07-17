import {useEffect, useState} from 'react';

interface Options {
    method: string;
    headers: { 
        "Content-Type": "application/json",
        "Authorization"?: string
    };
}

export const useDataFetching = <T> (
    url:string, 
    options:Options, 
    dependencyArray:any[], 
    setterFn?:React.Dispatch<React.SetStateAction<any>>, 
    loadingFn?:React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        loadingFn ? loadingFn(true) : null;
        const fetchData = async () => {
            if (url) {
            try {
                const getData = await fetch(url, options);
                const getDataJson: T = await getData.json();
                setData(getDataJson);
                setterFn ? setterFn(getDataJson): null;
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                loadingFn ? loadingFn(false) : null;
            }
        } else {
            console.log("No URL")
            loadingFn ? loadingFn(false) : null;
        }
        };
        fetchData();
        }, [...dependencyArray]);
  
    return data;
}