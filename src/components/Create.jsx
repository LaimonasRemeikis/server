import { useRef, useState } from "react";
import getBase64 from "../Functions/getBase64";

function Create({setCreateData}) {

    const [title, setTitle] = useState('');
    const [height, setHeight] = useState('');
    const [type, setType] = useState('1');
    const fileInput = useRef();

    const buttonHandler = () => {
        const file = fileInput.current.files[0];

        if (file) {
            getBase64(file)
            .then(photo => {
                console.log(photo);
                setCreateData({
                    title,
                    height,
                    type,
                    photo
                });
            });
        } else {
            setCreateData({
                title,
                height,
                type,
                photo: ''
            });
        }
        setTitle('');
        setHeight('');
        setType(1);
    }


    const inputHandler = (e, which) => {
        switch(which) {
            case 'title': 
            setTitle(e.target.value);
            break;
            case 'height': 
            setHeight(e.target.value.replace(/,/g, '.'));
            break;
            case 'type': 
            setType(e.target.value);
            break;
            default:
        }
    }

    return (
        <div className="card m-2">
            <div className="card-header">
                <h2>Add New Tree</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Tree title</label>
                    <input type="text" className="form-control" onChange={e => inputHandler(e, 'title')} value={title} />
                    <small className="form-text text-muted">Add new tree name here.</small>
                </div>
                <div className="container p-0">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label>Tree height</label>
                                <input type="text" className="form-control" onChange={e => inputHandler(e, 'height')} value={height} />
                                <small className="form-text text-muted">Tree height.</small>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-group">
                                <label>Tree type</label>
                                <select className="form-control" onChange={e => inputHandler(e, 'type')} value={type}>
                                    <option value="1">Leaf</option>
                                    <option value="2">Spike</option>
                                    <option value="3">Palm</option>
                                </select>
                                <small className="form-text text-muted">Tree type.</small>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Photo</label>
                                <input ref={fileInput} type="file" className="form-control" />
                                <small className="form-text text-muted">Tree photo.</small>
                            </div>
                        </div>
                        <div className="buttons">
                        <button type="button" className="btn btn-outline-primary m-3" onClick={buttonHandler}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Create;