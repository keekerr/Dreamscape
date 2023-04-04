import React from 'react';

function DiaryEntry({ entry, handleRemoveEntry }) {
  return (
    <div className='card mt-4' key={entry._id} style={{ maxWidth: "75vw" }}>
      <div className='card-header h4' style={{ textAlign: "left", backgroundColor: "#7092ff", color: "white" }}>{entry.title}
      <button
          type='button'
          className='btn btn-outline-danger btn-sm float-end'
          onClick={() => handleRemoveEntry(entry.entryID)}
        >
          <i class='bi bi-trash'></i>
        </button></div>
      <div className='card-body'>
        <p className='card-text'>{entry.entry}</p>
      </div>
    </div>
  );
}

export default DiaryEntry;
