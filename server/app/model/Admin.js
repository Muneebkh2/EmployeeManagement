// const getDATA = () => 'SELECT * FROM person';
// const deleteDATA = () => 'DELETE * FROM person';

class Admin {

    // get Data
    getDATA() {
       return 'SELECT * FROM person' 
    }
    // delete data
    deleteDATA() {
        return 'DELETE FROM person WHERE ID = 3'
    }
}

export default new Admin();