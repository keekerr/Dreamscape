import React from 'react';

function Diary() {
  return (
    <div>
      <h1 class='text-center m-5'>Welcome your Diary</h1>
      <form>
        <div class='mx-5'>
          <label for='exampleInputEmail1' class='form-label'>
          </label>
          <input
            type='text'
            class='form-control'
            id='diary-title'
            placeholder='Enter title for Diary entry here...'
          />
          <div id='emailHelp' class='form-text'>
          </div>
        </div>
        <div class='mx-5'>
          <label for='exampleFormControlTextarea1' class='form-label'>
          </label>
          <textarea
            class='form-control'
            id='diary-text'
            rows='3'
            placeholder='Enter text for Diary entry here...'
          ></textarea>
        </div>
        <button type='submit' class='btn btn-dark mx-5 my-2 px-4'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Diary;
