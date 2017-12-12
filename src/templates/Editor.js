import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

const options = {
  toolbar: [
    // Styles
    'bold', 'italic', 'strikethrough', '|',
    // Blocks
    'heading', 'quote', 'code', '|',
    // Structures
    'unordered-list', 'ordered-list', 'table', '|',
    // Links
    'link', 'image', '|',
    // Miscellaneous
    'guide',
  ],
}

export default ({ contents, onChange }) => <SimpleMDE value={contents} options={options} onChange={onChange} />
