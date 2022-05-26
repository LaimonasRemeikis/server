
function TreeLine({ tree, setDeleteId, setModalData, deleteComment }) {

    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                    <span>{tree.name}</span>
                    <span>{tree.height} m</span>
                    <span>{['Leaf','Spike','Palm'][tree.type - 1]}</span>
                </div>
                <div className="tree-line__buttons">
                <button type="button" className="btn btn-outline-primary m-1" onClick={()=>setModalData(tree)}>Edit</button>
                <button type="button" className="btn btn-outline-danger m-1" onClick={()=>setDeleteId({id:tree.id})}>Delete</button>
                </div>
            </div>
            <ul className="list-group mt-4">
                    {
                        // tree.comments => 'kdkjfs,skjdfgidsu,dsugfid'
                        // tree.cid => '2,8,7'
                        
                        
                        tree.comments ? tree.comments.slice(0, -5).split('-^o^-,').map((com, i) => (
                            <li className="list-group-item" key={i}>
                                {com}
                                <div>
                                <button type="button" onClick={() => deleteComment(tree.cid.split(',')[i])} className="btn btn-outline-danger mt-3">Delete</button>
                                </div>
                            </li>
                        )) : null
                    }
            </ul>
        </li>
    )
}

export default TreeLine;