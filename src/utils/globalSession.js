const globalSession = (key = null, value = null) => {
  if (!global.expressGlobalSession) {
    global.expressGlobalSession = {};
  }

  if (key && value) {
    global.expressGlobalSession[key] = value;
  }

  if (key) {
    return global.expressGlobalSession[key];
  }
};

export default globalSession;
