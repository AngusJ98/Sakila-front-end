import { useCollapse } from 'react-collapsed' 
import { Link } from 'react-router-dom'



function FilmInstance (props:{id: number, title: string, description: string, releaseYear:number}) {
    const { getCollapseProps, getToggleProps } = useCollapse()
    return (
        <div className="coolBoxRed fixedBox filmInstance" >
            <div className="" {...getToggleProps()}>
                <h3 className="">{props.title}</h3>
                <p className="">{props.releaseYear}</p>
                <div className="expandable" {...getCollapseProps()}>
                    <p>{props.description}</p>
                    <Link to={"/films/" + props.id}>Click for more info</Link>
                </div>
            </div>
        </div>
    )
}

export default FilmInstance