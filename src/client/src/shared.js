
export const handleChange = function handleChange(event, currentState, setState) {
  event.persist();
  setState({ ...currentState, [event.target.name]: event.target.value });
}
