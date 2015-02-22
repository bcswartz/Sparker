var UtilityFunctions = ( function() {

    this.renderDependencyInjections = function( diOption, context ) {
        var dependencyInjections = {};

        if( diOption === '' ) {
            dependencyInjections.list = '';
            dependencyInjections.quotedList = '' ;
        } else {
            var diArray = diOption.split(",");
            dependencyInjections.list = diArray.join(', ');
            dependencyInjections.quotedList = diArray.map( function( di ) {
                return "'" + di + "'";
            }).join(', ') + ', ';
        }

        return dependencyInjections;
    }

});

module.exports = UtilityFunctions;