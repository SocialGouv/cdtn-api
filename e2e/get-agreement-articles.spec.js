describe(`[GET] /agreement/articles`, () => {
  it(`should pass`, async () => {
    const { data: received } = await axios.get(
      "/agreement/articles?articleIdsOrCids=KALIARTI000020960580,KALIARTI000038632552",
    );

    expect(received).toMatchObject([
      {
        cid: "KALIARTI000020960580",
        containerId: "KALICONT000005635091",
        content: expect.any(String),
        id: expect.any(String),
        index: expect.any(String),
        path: expect.any(String),
      },
      {
        cid: "KALIARTI000038632552",
        containerId: "KALICONT000038661444",
        content: expect.any(String),
        id: expect.any(String),
        index: expect.any(String),
        path: expect.any(String),
      },
    ]);
  });
});
