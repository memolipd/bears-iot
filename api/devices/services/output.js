'use strict';

module.exports = {
  get_output: function * (device) {
    console.log(device)
    let output = 0;

    Readings.find({
      where: {
        device: device.id
      },
      limit: device.buffer,
      sort: 'createdAt DESC',
      select: ['id','createdAt', 'value']
    })
    .exec(callback);



    function callback(err, results){
      if (err) {
        console.log(err);
        return err
      }
      let temp_output = 0;
      for (var i = 0; i < results.length; i++) {
        temp_output += (device.target - results[i].value)
      }

      output = temp_output/device.buffer
      device['output'] = output
      return device;
    };
  }
};
