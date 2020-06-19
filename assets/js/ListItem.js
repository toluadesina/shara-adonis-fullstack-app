
class ListItem extends Stimulus.Controller{

    static get targets(){}
    initialize(){}

    destroyItem(evt) {
        evt.preventDefault()

        const itemId = this.data.get('id')

        const path = this.data.get('path')

        return axios
            .delete('http://localhost:3333/' + path + '/' + itemId)
            .then(resp => {
               location.reload()
        })
    }

   
}