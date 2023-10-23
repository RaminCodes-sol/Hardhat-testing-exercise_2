const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");




describe("Token", () => {
    
    const deployTokenFixture = async () => {
        let token = await hre.ethers.deployContract("Token", ["TickoTick", "TOT", 1000]);
        await token.waitForDeployment();

        let [deployer, Alex, Loura] = await hre.ethers.getSigners()

        return { token, deployer, Alex, Loura }
    }

    /*-------Development-------*/
    describe("Development", async () => {
        it("Should set the right owner", async () => {
            const { token, deployer } = await loadFixture(deployTokenFixture)
            expect(await token.owner()).to.equal(deployer.address)
        })
        
        it("Should assign token name", async () => {
            const { token } = await loadFixture(deployTokenFixture)
            expect(await token.name()).to.equal("TickoTick")
        })
        
        it("Should assign token symble", async () => {
            const { token } = await loadFixture(deployTokenFixture)
            expect(await token.symble()).to.equal("TOT")
        })
        
        it("Should assign token total supply", async () => {
            const { token, deployer } = await loadFixture(deployTokenFixture)

            const deployerBalance = await token.balanceOf(deployer.address)
            expect(await token.totalSupply()).to.equal(deployerBalance)
        })
    })


    /*-------Get Token Name-------*/
    describe('Get Token Name', async () => {
        it("Should return token name", async () => {
            const { token } = await loadFixture(deployTokenFixture)
            expect(await token.name()).to.be.a("string").to.equal("TickoTick")
        })
    })

    
    /*-------Get Token Symble-------*/
    describe('Get Token Symble', async () => {
        it("Should return token symble", async () => {
            const { token } = await loadFixture(deployTokenFixture)
            expect(await token.symble()).to.be.a('string').to.equal("TOT")
        })
    })


    /*-------Transfering Token-------*/
    describe('Transfering Token', async () => {
        it("Should fails if there is not enough token", async () => {
            const { token, Alex, deployer } = await loadFixture(deployTokenFixture)

            const deployerInitialBalance = await token.balanceOf(deployer.address)

            await expect(token.connect(Alex).transfer(deployer.address, 1)).to.be.revertedWith("Not enough tokens")
            
            expect(await token.balanceOf(deployer.address)).to.equal(deployerInitialBalance)
        })
        
        it("Should transfer Token Between accounts", async () => {
            const { token, deployer, Alex, Loura } = await loadFixture(deployTokenFixture)

            //-- We can test like this way
            await expect(token.connect(deployer).transfer(Alex.address, 50)).to.changeTokenBalances(token, [deployer, Alex], [-50, 50])
            await expect(token.connect(Alex).transfer(Loura.address, 50)).to.changeTokenBalances(token, [Alex, Loura], [-50, 50])

            //-- or We can test like this way
            // await token.connect(deployer).transfer(Alex.address, 50)
            // expect(await token.balanceOf(Alex.address)).to.equal(50)
            
            // await token.connect(Alex).transfer(Loura, 50)
            // expect(await token.balanceOf(Loura.address)).to.equal(50)        
        })

        it("Should emit Transfered event", async () => {
            const { token, deployer, Alex, Loura } = await loadFixture(deployTokenFixture)

            await expect(token.connect(deployer).transfer(Alex.address, 50)).to.emit(token, "Transfered").withArgs(deployer.address, Alex.address, 50)
            await expect(token.connect(Alex).transfer(Loura.address, 50)).to.emit(token, "Transfered").withArgs(Alex.address, Loura.address, 50)
        })
    })


    /*-------Get Balance Of an Specific Account-------*/
    describe('Get Balance Of', async () => {
        it("Should return balance of an specific account", async () => {
            const { token, deployer } = await loadFixture(deployTokenFixture)
            expect(await token.balanceOf(deployer.address)).to.equal(1000)
        })
    })

})

