const server = require('./index');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

const CONSTS = require("../../consts");

describe('Dashboard', () => {

  afterAll(done => {
    server.close();
    done();
  });

  describe("1 load", () => {

    let body = {
      length: 20,
      loads: [
        {
          type: CONSTS.PL,
          direction: CONSTS.DOWN,
          mag: 50,
          pos: 10,
        }
      ],
      type: 0,
      supportPos1: 0,
      supportPos2: 20,
    }

    it('is in the middle', async () => {
      const res = await requestWithSupertest.post('/')
        .set('Content-type', 'application/json')
        .send(body);
      expect(res.body).toEqual({
        "A": {
          "direction": "UP",
          "mag": 25,
          "pos": 0,
        },
        "B": {
          "direction": "UP",
          "mag": 25,
          "pos": 20,
        },
        "sfeqn": {
          "define": {
            "left": "0",
            "right": "-50 + A + B",
          },
          "final": {
            "left": "B",
            "right": "25",
          },
          "letA": {
            "left": "0",
            "right": "-50 + 25 + B",
          },
          "sumA": {
            "left": "0",
            "right": "-25 + B",
          },
          "sumF": {
            "left": "0",
            "right": "-50 + A + B",
          },
        },
        "smeqn": {
          "brackets": {
            "left": "0",
            "right": "-50(10) + A(20)",
          },
          "define": {
            "left": "0",
            "right": "-50(Xb - 10) + A(Xb - 0)",
          },
          "final": {
            "left": "A",
            "right": "25",
          },
          "letXb": {
            "left": "0",
            "right": "-50(20 - 10) + A(20 - 0)",
          },
          "moveA": {
            "left": "20A",
            "right": "500",
          },
          "sumMs": {
            "left": "0",
            "right": "-500 + 20A",
          },
        },
      });
    });

  })

  it('finds reactions of two loads', async () => {
    const res = await requestWithSupertest.post('/')
      .set('Content-type', 'application/json')
      .send({
        length: 6,
        loads: [
          {
            type: CONSTS.PL,
            direction: CONSTS.DOWN,
            mag: 15,
            pos: 2,
          },
          {
            type: CONSTS.PL,
            direction: CONSTS.DOWN,
            mag: 6,
            pos: 4,
          }
        ],
        type: 0,
        supportPos1: 0,
        supportPos2: 6,
      });
    expect(res.body).toEqual({
      "A": {
        "direction": "UP",
        "mag": 12,
        "pos": 0,
      },
      "B": {
        "direction": "UP",
        "mag": 9,
        "pos": 6,
      },
      "sfeqn": {
        "define": {
          "left": "0",
          "right": "-15 - 6 + A + B",
        },
        "final": {
          "left": "B",
          "right": "9",
        },
        "letA": {
          "left": "0",
          "right": "-21 + 12 + B",
        },
        "sumA": {
          "left": "0",
          "right": "-9 + B",
        },
        "sumF": {
          "left": "0",
          "right": "-21 + A + B",
        },
      },
      "smeqn": {
        "brackets": {
          "left": "0",
          "right": "-15(4) - 6(2) + A(6)",
        },
        "define": {
          "left": "0",
          "right": "-15(Xb - 2) - 6(Xb - 4) + A(Xb - 0)",
        },
        "final": {
          "left": "A",
          "right": "12",
        },
        "letXb": {
          "left": "0",
          "right": "-15(6 - 2) - 6(6 - 4) + A(6 - 0)",
        },
        "moveA": {
          "left": "6A",
          "right": "72",
        },
        "sumMs": {
          "left": "0",
          "right": "-72 + 6A",
        },
      },
    })

  })


  it.only('finds reactions with one UDL', async () => {
    const res = await requestWithSupertest.post('/api')
      .set('Content-type', 'application/json')
      .send({
        type: CONSTS.SS,
        length: 10,
        loads: [
          {
            type: CONSTS.UDL,
            direction: CONSTS.DOWN,
            mag: 5,
            startPos: 0,
            pos: 10,
          }
        ],
        supports: [
          {
            label: "A",
            pos: 0,
          },
          {
            label: "C",
            pos: 10,
          }
        ],
      });
    console.log(res.body);

    expect(res.body).toEqual({
      "A": {
        "direction": "UP",
        "mag": 25,
        "pos": 0,
      },
      "B": {
        "direction": "UP",
        "mag": 25,
        "pos": 10,
      },
      "sfeqn": {
        "define": {
          "left": "0",
          "right": "-50 + A + B",
        },
        "final": {
          "left": "B",
          "right": "25",
        },
        "letA": {
          "left": "0",
          "right": "-50 + 25 + B",
        },
        "sumA": {
          "left": "0",
          "right": "-25 + B",
        },
        "sumF": {
          "left": "0",
          "right": "-50 + A + B",
        },
      },
      "smeqn": {
        "brackets": {
          "left": "0",
          "right": "-50(5) + A(10)",
        },
        "define": {
          "left": "0",
          "right": "-50(Xb - 5) + A(Xb - 0)",
        },
        "final": {
          "left": "A",
          "right": "25",
        },
        "letXb": {
          "left": "0",
          "right": "-50(10 - 5) + A(10 - 0)",
        },
        "moveA": {
          "left": "10A",
          "right": "250",
        },
        "sumMs": {
          "left": "0",
          "right": "-250 + 10A",
        },
      }
    });
  });

  it('finds reactions with a UDL and a point load', async () => {
    const res = await requestWithSupertest.post('/')
      .set('Content-type', 'application/json')
      .send({
        length: 12,
        loads: [
          {
            type: CONSTS.UDL,
            direction: CONSTS.DOWN,
            mag: 8,
            startPos: 2,
            pos: 8,
          },
          {
            type: CONSTS.PL,
            direction: CONSTS.DOWN,
            mag: 36,
            pos: 10,
          }
        ],
        type: 0,
        supportPos1: 0,
        supportPos2: 12,
      });
    expect(res.body).toEqual({
      "A": {
        "direction": "UP",
        "mag": 34,
        "pos": 0,
      },
      "B": {
        "direction": "UP",
        "mag": 50,
        "pos": 12,
      },
      "sfeqn": {
        "define": {
          "left": "0",
          "right": "-48 - 36 + A + B",
        },
        "final": {
          "left": "B",
          "right": "50",
        },
        "letA": {
          "left": "0",
          "right": "-84 + 34 + B",
        },
        "sumA": {
          "left": "0",
          "right": "-50 + B",
        },
        "sumF": {
          "left": "0",
          "right": "-84 + A + B",
        },
      },
      "smeqn": {
        "brackets": {
          "left": "0",
          "right": "-48(7) - 36(2) + A(12)",
        },
        "define": {
          "left": "0",
          "right": "-48(Xb - 5) - 36(Xb - 10) + A(Xb - 0)",
        },
        "final": {
          "left": "A",
          "right": "34",
        },
        "letXb": {
          "left": "0",
          "right": "-48(12 - 5) - 36(12 - 10) + A(12 - 0)",
        },
        "moveA": {
          "left": "12A",
          "right": "408",
        },
        "sumMs": {
          "left": "0",
          "right": "-408 + 12A",
        },
      }
    });
  });


  /*it('finds reactions with a UDL and a point load', async () => {
    const res = await requestWithSupertest.post('/')
      .set('Content-type', 'application/json')
      .send({
        length: 8,
        loads: [
          {
            type: CONSTS.UDL,
            direction: CONSTS.DOWN,
            mag: 15,
            startPos: 5,
            pos: 8,
          },
          {
            type: CONSTS.PL,
            direction: CONSTS.DOWN,
            mag: 8,
            pos: 3,
          },
          {
            type: CONSTS.M,
            direction: CONSTS.CLOCKWISE,
            mag: 20,
            pos: 2,
          },
        ],
        type: 0,
        supportPos1: 0,
        supportPos2: 5,
      });
    expect(res.body).toEqual({
      A1: -14.3,
      A2: 67.3,
    });
  });

  */

  it('finds reactions with a UDL and a point load', async () => {
    const res = await requestWithSupertest.post('/')
      .set('Content-type', 'application/json')
      .send({
        length: 12,
        loads: [
          {
            type: CONSTS.UDL,
            direction: CONSTS.DOWN,
            mag: 200,
            startPos: 3,
            pos: 9,
          },
          {
            type: CONSTS.PL,
            direction: CONSTS.DOWN,
            mag: 400,
            pos: 0,
          },
          {
            type: CONSTS.PL,
            direction: CONSTS.DOWN,
            mag: 400,
            pos: 12,
          },
        ],
        type: 0,
        supportPos1: 3,
        supportPos2: 9,
      });
    expect(res.body).toEqual({
      "A": {
        "direction": "UP",
        "mag": 1000,
        "pos": 3,
      },
      "B": {
        "direction": "UP",
        "mag": 1000,
        "pos": 9,
      },
      "sfeqn": {
        "define": {
          "left": "0",
          "right": "-1200 - 400 - 400 + A + B",
        },
        "final": {
          "left": "B",
          "right": "1000",
        },
        "letA": {
          "left": "0",
          "right": "-2000 + 1000 + B",
        },
        "sumA": {
          "left": "0",
          "right": "-1000 + B",
        },
        "sumF": {
          "left": "0",
          "right": "-2000 + A + B",
        },
      },
      "smeqn": {
        "brackets": {
          "left": "0",
          "right": "-1200(3) - 400(9) - 400(-3) + A(6)",
        },
        "define": {
          "left": "0",
          "right": "-1200(Xb - 6) - 400(Xb - 0) - 400(Xb - 12) + A(Xb - 3)",
        },
        "final": {
          "left": "A",
          "right": "1000",
        },
        "letXb": {
          "left": "0",
          "right": "-1200(9 - 6) - 400(9 - 0) - 400(9 - 12) + A(9 - 3)",
        },
        "moveA": {
          "left": "6A",
          "right": "6000",
        },
        "sumMs": {
          "left": "0",
          "right": "-6000 + 6A",
        },
      }
    });
  });

  it('finds reactions with a UDL and a point load', async () => {
    const res = await requestWithSupertest.post('/')
      .set('Content-type', 'application/json')
      .send({
        length: 6,
        loads: [
          {
            type: CONSTS.UDL,
            direction: CONSTS.DOWN,
            mag: 20,
            startPos: 0,
            pos: 4,
          },
          {
            type: CONSTS.PL,
            direction: CONSTS.DOWN,
            mag: 20,
            pos: 6,
          },
        ],
        type: 0,
        supportPos1: 0,
        supportPos2: 4,
      });
    expect(res.body).toEqual({
      "A": {
        "direction": "UP",
        "mag": 30,
        "pos": 0,
      },
      "B": {
        "direction": "UP",
        "mag": 70,
        "pos": 4,
      },
      "sfeqn": {
        "define": {
          "left": "0",
          "right": "-80 - 20 + A + B",
        },
        "final": {
          "left": "B",
          "right": "70",
        },
        "letA": {
          "left": "0",
          "right": "-100 + 30 + B",
        },
        "sumA": {
          "left": "0",
          "right": "-70 + B",
        },
        "sumF": {
          "left": "0",
          "right": "-100 + A + B",
        },
      },
      "smeqn": {
        "brackets": {
          "left": "0",
          "right": "-80(2) - 20(-2) + A(4)",
        },
        "define": {
          "left": "0",
          "right": "-80(Xb - 2) - 20(Xb - 6) + A(Xb - 0)",
        },
        "final": {
          "left": "A",
          "right": "30",
        },
        "letXb": {
          "left": "0",
          "right": "-80(4 - 2) - 20(4 - 6) + A(4 - 0)",
        },
        "moveA": {
          "left": "4A",
          "right": "120",
        },
        "sumMs": {
          "left": "0",
          "right": "-120 + 4A",
        },
      },
    });
  });

  /*
 
  it('finds reactions with a UDL and a point load', async () => {
    const res = await requestWithSupertest.post('/')
      .set('Content-type', 'application/json')
      .send({
        length: 12,
        loads: [
          {
            type: CONSTS.UDL,
            direction: CONSTS.DOWN,
            mag: 10,
            startPos: 0,
            pos: 6,
          },
          {
            type: CONSTS.M,
            direction: CONSTS.ANTICLOCKWISE,
            mag: 20,
            pos: 9,
          },
        ],
        type: 0,
        supportPos1: 0,
        supportPos2: 12,
      });
    expect(res.body).toEqual({
      A1: 46.7,
      A2: 13.3,
    });
  });
 
 
  it('finds reactions with a UDL and a point load', async () => {
    const res = await requestWithSupertest.post('/')
      .set('Content-type', 'application/json')
      .send({
        length: 12,
        loads: [
          {
            type: CONSTS.UDL,
            direction: CONSTS.DOWN,
            mag: 10,
            startPos: 10,
            pos: 30,
          },
          {
            type: CONSTS.PL,
            direction: CONSTS.DOWN,
            mag: 100,
            pos: 20,
          },
          {
            type: CONSTS.M,
            direction: CONSTS.ANTICLOCKWISE,
            mag: 3000,
            pos: 40,
          },
        ],
        type: 0,
        supportPos1: 0,
        supportPos2: 30,
      });
    expect(res.body).toEqual({
      A1: 200,
      A2: 100,
    });
  });
 
    */

});