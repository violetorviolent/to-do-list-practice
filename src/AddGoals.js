import { FaPlus } from 'react-icons/fa';
import {useRef} from 'react';

const AddGoals = ({newGoal, setNewGoal, handleSubmit}) => {
  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor='addGoal'>Add Goal</label>
      <input 
      autoFocus
      ref = {inputRef}
      id ='addGoal'
      type="text"
      placeholder="Add Goal"
      required
      value ={newGoal}
      onChange= {(e) => setNewGoal(e.target.value)}/>
      <button
      type="submit"
      aria-label='Add Goal'
      onClick={() => inputRef.current.focus()}>
        <FaPlus />
      </button>
    </form>
  )
}

export default AddGoals