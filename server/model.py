from flask import Flask,request,jsonify 
from requests import get
import torch
from torch import nn
from web3 import Web3
import json 
from config import address1,abi1,address2,abi2



app = Flask(__name__)


class PredictCrowdFundV2(nn.Module):
    def __init__(self):
        super().__init__()
        #using nn.Linear() for creating parameters
        self.linear_layer = nn.Sequential(
            nn.Linear(in_features=4,out_features=8),
            nn.ReLU(),
            nn.Linear(in_features=8,out_features=8),
            nn.ReLU(),
            nn.Linear(in_features = 8,out_features=1)
        )
        
    def forward(self,x:torch.Tensor)->torch.Tensor:
        return self.linear_layer(x)

model = PredictCrowdFundV2()
model.load_state_dict(torch.load('tensors/crowdfunding2.pth'))
model.eval()



#Web3 user blockchain
ganache_url = "http://127.0.0.1:8545"

web3 = Web3(Web3.HTTPProvider(ganache_url))
web3.eth.defaultAccount = web3.eth.accounts[0]


maintainUsers = dict()
maintainCampaigns = dict()
increment = 0
incrementcamp = 0

@app.route('/createUser', methods=['POST'])
def createUser(): 
    data = request.get_json()
    global increment
    maintainUsers.update({increment: data['data']})
    increment = increment + 1
    contract = web3.eth.contract(address=address1,abi=abi1)
    tx_hash = contract.functions.createUser(f"{data['data']}").transact({'from':'0xFdd17180283066D605877D5a4796963cea6AfFC6'})
    web3.eth.wait_for_transaction_receipt(tx_hash)
    return jsonify(f"{(contract.functions.getAllUsers().call())}")
    # return jsonify(createUser);

@app.route('/createpost', methods=['POST'])
def createPost():
   data = request.get_json()
   
   contract = web3.eth.contract(address=address1, abi = abi1)
   tx_hash = contract.functions.pushUserPost(int(list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])]),data['value']).transact({'from':'0xFdd17180283066D605877D5a4796963cea6AfFC6'})
   tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
   return f"{(contract.functions.getUserPosts(int(list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])).call())}"

       

@app.route('/getusersinfo',methods=['GET'])
def getuserinfo():
    contract = web3.eth.contract(address = address1, abi = abi1)
    value = contract.functions.getAllUsers().call()
    return value

@app.route('/getuserposts',methods=['POST'])
def getuserposts():
    data = request.get_json()
    contract = web3.eth.contract(address = address1, abi = abi1)
    return f"{(contract.functions.getUserPosts(int(list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])).call())}"

@app.route('/getinfoofuser',endpoint='getinfo',methods=["POST"])
def getuserinfo():
    data = request.get_json()
    contract = web3.eth.contract(address=address1,abi = abi1)
    return f"{(contract.functions.getUserInfo(int(list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])).call())}"

@app.route('/setlikes',methods=['POST'])
def setlikes():
    data = request.get_json()
    contract = web3.eth.contract(address = address1, abi = abi1)
    key = int(list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])
    value = data['value']
    tx_hash = contract.functions.setLikes(key,int(value)).transact({'from':'0xFdd17180283066D605877D5a4796963cea6AfFC6'})
    web3.eth.wait_for_transaction_receipt(tx_hash)
    return f"{(contract.functions.getUserInfo(int(list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])).call())}"
    
@app.route('/setdislikes',methods=['POST'])
def setDislikes():
    data = request.get_json()
    contract = web3.eth.contract(address = address1,abi = abi1)
    key = int (list (maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])
    value = data['value']
    tx_hash = contract.functions.setdisLikes(key,int(value)).transact({'from':'0xFdd17180283066D605877D5a4796963cea6AfFC6'})
    return f"{(contract.functions.getUserInfo(int(list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])).call())}"
    
@app.route('/gift',methods=['POST'])
def gift():
    data = request.get_json()
    contract = web3.eth.contract(address = address1, abi = abi1)
    key = int (list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])
    value = data['value']
    tx_hash = contract.functions.giveGift(key).transact({'from':'0xFdd17180283066D605877D5a4796963cea6AfFC6'})
    return f"{(contract.functions.getUserInfo(int(list(maintainUsers.keys())[list(maintainUsers.values()).index(data['data'])])).call())}"

    

#Crowdfunding blockchain
@app.route('/createcampaign', methods=['POST'])
def createcampaign():
    data = request.get_json()
    contract = web3.eth.contract(address=address2,abi=abi2)
    maintainCampaigns.update({incrementcamp: data['title']})
    tx_hash = contract.functions.createCampaign(f"{data['owner']}",f"{data['title']}",f"{data['description']}",data['target'],data['deadline']).transact({'from':'0xFdd17180283066D605877D5a4796963cea6AfFC6'})
    web3.eth.wait_for_transaction_receipt(tx_hash)
    value = contract.functions.getCampaigns().call()
    return value
    
@app.route('/getcampaigns',methods=['GET'])
def getcampaigns():
    contract = web3.eth.contract(address = address2, abi = abi2)
    value = contract.functions.getCampaigns().call()
    return value
    

@app.route('/getdonators',methods=['POST'])
def getdonators():
    data = request.get_json()
    contract = web3.eth.contract(address = address2, abi = abi2)
    return f"{contract.functions.getDonators(int(list(maintainCampaigns.keys())[list(maintainCampaigns.values()).index(data['title'])])).call()}"

@app.route('/donatetocampaign',methods=['POST'])
def donatetocampaign():
    data = request.get_json()
    contract = web3.eth.contract(address = address2,abi = abi2)
    tx_hash = contract.functions.donateToCampaign(int(list(maintainCampaigns.keys())[list(maintainCampaigns.values()).index(data['title'])]),data['value']).transact({'from':'0xFdd17180283066D605877D5a4796963cea6AfFC6'})
    web3.eth.wait_for_transaction_receipt(tx_hash)
    return f"{contract.functions.getDonators(int(list(maintainCampaigns.keys())[list(maintainCampaigns.values()).index(data['title'])])).call()}"

#ai model prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    value = model(torch.Tensor(list(data.values())[0])).detach().numpy()[0]
    
    return f"{value}"
     
    
if __name__ == '__main__':
    app.run()