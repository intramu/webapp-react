import React from "react";

class Todos extends React.Component {

    renderTodos() {
        if (this.props.data.code < 1 || this.props.data.length === 0) return;
        console.log(this.props.data);

        const todoItems = this.props.data.dataPackage.map((todo) => {
            return (todo.NAME)
        })

        const toDoList = (
            <>
                <h1>Todos</h1>
                <ul>{todoItems}</ul>
            </>
        );

        return toDoList;
    }

    render() {
        return <>{this.renderTodos()}
            <button onClick={() => this.props.getData("http://localhost:8080/team/showAllTeams")}>Get Data</button>
        </>
    }
}

export default Todos