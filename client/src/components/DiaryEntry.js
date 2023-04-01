import React from 'react';

function DiaryEntry({ entry, handleRemoveEntry }) {
  return (
    <div className='card bg-dark-subtle m-5' key={entry._id}>
      <div className='card-header'>{entry.title}</div>
      <div className='card-body'>
        <p className='card-text'>{entry.entry}</p>
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => handleRemoveEntry(entry.entryID)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default DiaryEntry;
