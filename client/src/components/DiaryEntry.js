import React from 'react';

function DiaryEntry({ entry, handleRemoveEntry }) {
  return (
    <div className='card m-5' key={entry._id}>
      <div className='card-header h4' style={{ textAlign: "left", backgroundColor: "#b8c9ff", color: "white" }}>{entry.title}
      <button
          type='button'
          className='btn btn-outline-danger btn-sm float-end'
          onClick={() => handleRemoveEntry(entry.entryID)}
        >
          x
        </button></div>
      <div className='card-body'>
        <p className='card-text'>{entry.entry}</p>

      </div>
    </div>
  );
}

export default DiaryEntry;
