describe(`[GET] /agreements`, () => {
  it(`should pass`, async () => {
    const { data: received } = await axios.get("/agreements");

    expect(received.length).toBe(387);
  });
});
