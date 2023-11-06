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
                {name: "f", salary: 800, increase: true, rise: false, id: 1},
                {name: "s", salary: 800, increase: true, rise: true, id: 2},
                {name: "a", salary: 800, increase: false, rise: false, id: 3},
                {name: "b", salary: 800, increase: true, rise: false, id: 4}
            ],
            term: "",
            filter: "all"
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

    searchEmp = (items, term) => {
        if (term.length === 0)
            return items

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }
    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    filterEmp = (items, filter) => {
        switch (filter) {
            case "rise":
                return items.filter(item => {
                    return item.rise === true
                })
            case "moreThen1000":
                return items.filter(item => {
                    return item.salary > 1000
                })
            default:
                return items
        }

        // if (filter === "Все сотрудники" || filter.length === 0)
        //     return items
        // if (filter === "На повышение")
        //     return items.filter(item => {
        //         return item.increase === true
        //     })
        // if (filter === "З/п больше 1000$")
        //     return items.filter(item => {
        //         return item.salary > 1000
        //     })
    }

    render() {
        const {data, term, filter} = this.state
        const employees = this.state.data.length
        const increased = this.state.data.filter(i => i.increase).length
        // console.log(this.searchEmp(data, term) + "asdasdasdas")
        const visibleData = this.searchEmp(this.filterEmp(data, filter), term)

        return (
            <div className={"app"}>
                <AppInfo
                    employees={employees}
                    increased={increased}
                />

                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        onUpdateFilter={this.onFilterSelect}
                        filter={filter}/>
                </div>

                <EmployeeList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeeAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App