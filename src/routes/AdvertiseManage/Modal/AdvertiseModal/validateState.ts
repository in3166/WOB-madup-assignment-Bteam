function validateTitle(value: string) {
  return value.length > 4
}

function validateBudget(value: string) {
  console.log(/^\d+$/.test(value))
  return /^\d+$/.test(value) && Number(value) >= 10
}

export { validateTitle, validateBudget }
