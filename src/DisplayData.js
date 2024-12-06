import React, {useState, useEffect} from "react";

const DataDisplay = () => {
    const [dataBoard, setDataBoard] = useState([]);

    const loadBoard = async () => {
        await fetch("http://localhost:8080/board")
        .then(resp => {
            return resp.json();
        }).then(result => {
            setDataBoard(result);
        }).catch(error => {
            console.error("Error fetching Board", error);
        });
    };

    const postBoard = async () => {
        try{
            const resp = await fetch("http://localhost:8080/board",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer abcd'
                },
                body:JSON.stringify({
                    title:'postTitle',
                    content:'postContent'
                })
            });
            if(resp.ok) loadBoard();
            else    throw new Error("fail to post Board");
        }catch(error){
            console.error("Error fetching Board", error);
        };
    };

    const loadData = () => {
        return (
            <table align="center" border={1} >
                <thead>
                    <tr>
                        <th>ID</th><th>title</th><th>writer</th>
                        <th>content</th><th>createDate</th>
                    </tr>
                </thead>

                <tbody>
                    {dataBoard.map(board =>(
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td>{board.title}</td>
                            <td>{board.writer}</td>
                            <td>{board.content}</td>
                            <td>{board.createDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return(
        <div>
            <h2>Data Display</h2>
            <button onClick={() => loadBoard()}>getBoard</button>
            <button onClick={() => postBoard()}>postBoard</button>
            <div>{loadData()}</div>
        </div>
    );
};

export default DataDisplay;
