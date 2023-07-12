function nameFormat (name) {
  name = name[0].toUpperCase() + name.substring(1).toLowerCase().trimEnd().trimStart()
  return name
}

module.exports = nameFormat
