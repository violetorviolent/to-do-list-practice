import { FaTrashAlt } from 'react-icons/fa';


const Content = ({goals, handleCheck, handleDelete }) => {
    
    return (
        <>
            {goals.length ? (
                <ul>
                {goals.map((item) => (
                    <li className='item' key={item.id}>
                        <input onChange={() => handleCheck(item.id)} type='checkbox' checked={item.checked} />
                        <label
                            onDoubleClick={() => handleCheck(item.id)}
                            style={(item.checked) ? { textDecoration: 'line-through' } : null}
                        >
                            {item.item}
                        </label>
                        <FaTrashAlt onClick={() => handleDelete(item.id)} 
                        role='button' 
                        tabIndex='0'
                        aria-label={`Delete ${item.item}`} />
                    </li>
                ))}
            </ul>
            ):
                (<p style={{ marginTop: '2rem' }}>Your list is empty.</p>)
            }
        </>
    )
}

export default Content