import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         })
    //         .catch(error => alert(error.message))
    // }, [])
    const { loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: menu = [] } = useQuery({
        queryKey: ['menu'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/menu")
            console.log('res from axios', res)
            return res.data;
        },
    })
    return [menu, refetch]
}
export default useMenu;