import './app.css'
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeeList from "../employee-list/employee-list";
import EmployeeAddForm from "../employee-add-form/employee-add-form";
import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "asdasda", salary: 800, increase: true, rise: false, id: 1},
                {name: "asdaasdsda", salary: 800, increase: true, rise: true, id: 2},
                {name: "asdaasdsda", salary: 800, increase: false, rise: false, id: 3},
                {name: "asdasdasda", salary: 800, increase: true, rise: false, id: 4}
            ]
        }
        this.maxId = this.state.data.length + 1
    }

    createItem = (name, salary) => {
        this.setState(({data}) => {

            return {
                data: data.push(
                    {
                        name: name,
                        salary: salary,
                        increase: false,
                        rise: false,
                        id: ++this.maxId
                    }
                )
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({data}) => {

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        this.setState(({data}) => {

            return {
                data: [...data, {
                    name,
                    salary,
                    rise: false,
                    increase: false,
                    id: this.maxId++
                }]
            }
        })
    }

    onToggleIncrease = (id) => {

        this.setState(({data}) => ({
            data: data.map(i => {
                if (i.id === id) {
                    return {...i, increase: !i.increase}
                }
                return i
            })
        }))
    }

    onToggleRise = (id) => {

        this.setState(({data}) => ({
            data: data.map(i => {
                if (i.id === id) {
                    return {...i, rise: !i.rise}
                }
                return i
            })
        }))
    }

    onToggleProp = (id, prop) => {

        this.setState(({data}) => ({
            data: data.map(i => {
                if (i.id === id) {
                    return {...i, [prop]: !i[prop]}
                }
                return i
            })
        }))
    }

    render() {
        const employees = this.state.data.length
        const increased = this.state.data.filter(i => i.increase).length
        return (
            <div className={"app"}>
                <AppInfo
                    employees={employees}
                    increased={increased}
                />

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeeList
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeeAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App