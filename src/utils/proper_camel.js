const proper_camel = word => {
  return word
    .split('_')
    .map(piece => {
      return piece[0].toUpperCase() + piece.slice(1).toLowerCase()
    })
    .join('')
}

export default proper_camel
