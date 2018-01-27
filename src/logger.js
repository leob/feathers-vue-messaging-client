function logger(level, name) {
  const fn = console[level]

  return (message, ...messages) => {

    if (message instanceof String) {
      fn(name.toUpperCase() + ':' + message, ...messages)
    } else {
      fn(name.toUpperCase() + ':', message, ...messages)
    }
  }
}

function debug(name) {
  return logger('log', name)
}

function info(name) {
  return logger('info', name)
}

function warn(name) {
  return logger('warn', name)
}

function error(name) {
  return logger('error', name)
}

export { logger, debug, info, warn, error }
