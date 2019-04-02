module.exports = (sequelize, type) => {
    return sequelize.define('sigpac_andalucia_ov_2019', {
      gid: {
        type: type.INTEGER,
        primaryKey: true
      },
      sigpac: {
        type: type.STRING,
        field: 'cod_rec'
      },
      geom: type.GEOMETRY('POINT', 25830)
    }, {
      timestamps: false
    })
}
