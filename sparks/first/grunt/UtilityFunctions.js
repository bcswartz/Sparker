var UtilityFunctions = ( function() {

    this.renderDependencyInjections = function( diOption, name ) {
        var dependencyInjections = {};

        if( diOption === '' ) {
            dependencyInjections.list = '';
        } else {
            var diArray = diOption.split(",");
            var quotedList = diArray.map( function( di ) {
                return "'" + di + "'";
            }).join(', ');

            dependencyInjections.list = diArray.join(', ');
            dependencyInjections.injectStatement = name + '.$inject = [ ' + quotedList + ' ];'
        }

        return dependencyInjections;
    }

});

module.exports = UtilityFunctions;