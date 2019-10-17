import React from "react";
import axios from "axios";

function UpdateMovie(props) {
	const [itemToUpdate, setItemToUpdate] = React.useState();

	React.useEffect(() => {
		const item = props.match.params.id;
		console.log(item);
		axios(`http://localhost:5000/api/movies/${item}`)
			.then(res => setItemToUpdate(res.data))
			.catch(err => console.log(err));
	}, [props.match.params.id]);

	const changeHandler = e => {
		console.log(e.target.value);
		setItemToUpdate({ ...itemToUpdate, [e.target.name]: e.target.value });
	};

	const submitHandler = e => {
		e.preventDefault();
		const item = props.match.params.id;
		axios
			.put(`http://localhost:5000/api/movies/${item}`, itemToUpdate)
			.then(() => props.history.push("/"))
			.catch(err => {
				console.log(err);
			});
	};

	if (!itemToUpdate) {
		return <h2>Loading</h2>;
	}

	return (
		<form action="" onSubmit={submitHandler}>
			<input
				type="text"
				name="title"
				value={itemToUpdate.title}
				onChange={changeHandler}
			/>
			<input
				type="text"
				name="director"
				value={itemToUpdate.director}
				onChange={changeHandler}
			/>
			<input
				type="text"
				name="metascore"
				value={itemToUpdate.metascore}
				onChange={changeHandler}
			/>
			<input
				type="text"
				name="stars"
				value={itemToUpdate.stars}
				onChange={changeHandler}
			/>
			<button type="submit">Submit</button>
		</form>
	);
}

export default UpdateMovie;
