import Realm from 'realm';

// SCHEMA NAMES
export const TODOLIST_SCHEMA = "TodoList";
export const TODO_SCHEMA = "Todo";
// Define your models and your properties

export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int', //Primary Key is not Auto incremennt
        name: { type: 'string', indexed: true },
        done: { type: 'bool', default: false }
    }
}
export const TodoListSchema = {
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        name: 'string',
        creationDate: 'date',
        todos: { type: 'list', objectType: TODO_SCHEMA }, //todos have an arrays of todos ralation one to many
    }
};
const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0, //optional    
};
//functions for TodoLists
export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODOLIST_SCHEMA, newTodoList);
            resolve(newTodoList);
        });
    }).catch((error) => reject(error));
});
export const updateTodoList = todoList => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let updatingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id);    //objectForPrimaryKey search or get a todolist obj from the specific ID
            updatingTodoList.name = todoList.name;    
            resolve();     
        });
    }).catch((error) => reject(error));;
});
export const deleteTodoList = todoListId => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
            realm.delete(deletingTodoList);
            resolve();   
        });
    }).catch((error) => reject(error));;
});
export const deleteAllTodoLists = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let allTodoLists = realm.objects(TODOLIST_SCHEMA); //this will get all the records in TodoList Table
            realm.delete(allTodoLists);
            resolve();
        });
    }).catch((error) => reject(error));;
});
export const queryAllTodoLists = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allTodoLists = realm.objects(TODOLIST_SCHEMA);
        resolve(allTodoLists);  
    }).catch((error) => {        
        reject(error);  
    });;
});
export const filterTodoLists = (searchedText) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let filteredTodoLists = realm.objects(TODOLIST_SCHEMA)
                                .filtered(`name CONTAINS[c] "${searchedText}"`);//[c] = case insensitive
        resolve(filteredTodoLists);
    }).catch((error) => {
        reject(error);
    });;
});
//Add array of Todos to an existing TodoList
export const insertTodos2TodoList = (todoListId, newTodos) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let todoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
        realm.write(() => {                                                
            for (var index in newTodos) {
                todoList.todos.push(newTodos[index]);                
            }
            resolve(newTodos);
        });
    }).catch((error) => {
        reject(error);
    });;
});
//Get todos from TodoList's Id
export const getTodosFromTodoListId = (todoListId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let todoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
        resolve(todoList.todos);
    }).catch((error) => {
        reject(error);
    });;
});
export default new Realm(databaseOptions); //realm Objects
