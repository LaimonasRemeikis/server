import { useState } from "react";

function TreeLine({ tree, saveVote , saveComment}) {

    const [vote, setVote ] = useState(5)
    const [comment, setComment ] = useState('')

    const clickVote = () =>{
        saveVote(tree.id, vote);
    }
    const clickComment = () =>{
        saveComment(tree.id, comment);
    }

    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                    <div>
                    <span>{tree.name}</span>
                    <span>{tree.height} m</span>
                    <span>{['Leaf','Spike','Palm'][tree.type - 1]}</span>
                    <b>{(tree.sum / tree.count || 1).toFixed(2)}</b>
                    <input type="number" min={1} max={10} className="ml-2" value={vote} onChange={e=>setVote(e.target.value)}></input>
                    <button type="button" className="btn btn-outline-primary ml-2" onClick={clickVote}>Vote</button>
                    <button type="button" className="btn btn-outline-success ml-2" onClick={clickComment}>Comment</button>
                    </div>
                    <div className="form-group ml-4">
                        <textarea className="form-control" onChange={e => setComment(e.target.value)} value={comment} placeholder="Comment" />
                    </div>

                    <div className="image-holder ml-4">
                        <img src={tree.photo}></img>
                    </div>

                    <div className="tree-line__content__comments">
                    {
                        tree.comments ? tree.comments.slice(0, -5).split('-^o^-,').map((c, i) => <div key={i}>{c}</div>) : null
                    }
                    </div>


                </div>
            </div>
        </li>
    )
}

export default TreeLine;