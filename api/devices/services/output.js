'use strict';

/**
 * Module dependencies
 */


module.exports = {
    get_output: function (device) {

      const deferred = Promise.defer();


      Readings.find({
        where: {
          device: device.id
        },
        limit: device.buffer,
        sort: 'createdAt DESC',
        select: ['id','createdAt', 'value']
      })
      .exec(readings_callback);

      function readings_callback (err, readings){
        if (err) {
          deferred.reject(err);
        }
        let temp_output = 0;
        for (var i = 0; i < readings.length; i++) {
          temp_output += (device.target - readings[i].value)
        }
        deferred.resolve(temp_output/device.buffer);
      };

    return deferred.promise;
  }
};
