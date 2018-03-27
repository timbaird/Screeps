

StructureController.prototype.getLink = function()
{
    try {
        if (!this.controller_link)
        {
            this.controller_link = {link: _.select(this.room.getLinks(), (x)=>{return x.role() == 'controller'})[0]};
        }
        return this.controller_link.link;
    }
    catch (ex){
        console.log('### EXCEPTION - StructureLink.prototype.getLink(): ' +  ex.message);
    }
};
