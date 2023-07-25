import { FiPlus, FiX } from 'react-icons/fi';

import { Container } from './styles';

export function NoteItem( { isNew, value, onClick, ...rest} ) {
  return(
    <Container isNew={isNew}>
       <input
       type="text"
       value={value}
       readOnly={!isNew} // user can't edit an item if it isn't a new item
       {...rest} 
       />

      <button
      type="button"
      onClick={onClick}
      className={ isNew ? 'button-add' : 'button-delete'}
      >
        {isNew ? <FiPlus/> : <FiX/>}
      </button>
    </Container>
  );
}