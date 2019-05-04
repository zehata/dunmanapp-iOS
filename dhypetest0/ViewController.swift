//
//  ViewController.swift
//  dhypetest0
//
//  Created by Apple on 16/2/19.
//  Copyright © 2019 Dunman High School. All rights reserved.
//

import UIKit
import WebKit
import Firebase
import GoogleSignIn

var jsWebView: WKWebView!
var guestWebView: WKWebView!
var html:String = "";
var loading:Bool = false

class ViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler, GIDSignInUIDelegate {
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "goto" {
            var selectedappid:String = message.body as! String
            jsWebView.evaluateJavaScript("goto('"+selectedappid+"')", completionHandler: nil)
        } else if message.name == "load"{
            html = message.body as! String
            let url = Bundle.main.url(forResource: "blankinapp1764336719128571.html", withExtension: nil, subdirectory: "public")!
            loading = true
            guestWebView.load(URLRequest(url: url))
        } else if message.name == "loadpage"{
            html = message.body as! String
            let url = Bundle.main.url(forResource: "blankinapp1764336719128571.html", withExtension: nil, subdirectory: "public")!
            loading = true
            guestWebView.load(URLRequest(url: url))
        } else if message.name == "populatedrawer"{
            var installedapplist:String = message.body as! String
            guestWebView.evaluateJavaScript("populatedrawer("+installedapplist+")", completionHandler: nil)
        } else if message.name == "consolelog"{
            print(message.body)
        } else if message.name == "reccardsadaptor"{
            var reccard = message.body as! String
            guestWebView.evaluateJavaScript("reccardsadaptor('"+reccard+"')", completionHandler: nil)
        } else if message.name == "firebaselogin"{
            GIDSignIn.sharedInstance().signIn()
        } else if message.name == "signOut"{
            let firebaseAuth = Auth.auth()
            do {
                try firebaseAuth.signOut()
            } catch let signOutError as NSError {
                print ("Error signing out: %@", signOutError)
            }
        } else if message.name == "loaded"{
            jsWebView.evaluateJavaScript("loaded()", completionHandler: nil)
        } else if message.name == "allowpermission"{
            jsWebView.evaluateJavaScript("allowpermission()", completionHandler: nil)
        } else if message.name == "darkentorequestpermission"{
            guestWebView.evaluateJavaScript("darkentorequestpermission()", completionHandler: nil)
        } else if message.name == "callAllApps"{
            jsWebView.evaluateJavaScript("callAllApps()", completionHandler: nil)
        } else if message.name == "returnreccards"{
            var returnedreccards = message.body as! String
            guestWebView.evaluateJavaScript("receivereccards('"+returnedreccards+"')", completionHandler: nil)
        } else if message.name == "splitviewgohome"{
            let url = Bundle.main.url(forResource: "homeinapp1764336719128571.html", withExtension: nil, subdirectory: "public")!
            guestWebView.load(URLRequest(url: url))
        }
    }
    
    func signIn(){
        guard var user = Auth.auth().currentUser else { return }
        print(user.displayName!)
        guestWebView.evaluateJavaScript("savedisplayname('"+user.displayName!+"')", completionHandler: nil)
        guestWebView.evaluateJavaScript("saveemail('"+user.email!+"')", completionHandler: nil)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib
        
        GIDSignIn.sharedInstance().uiDelegate = self
        
        let dhypeProcessPool = WKProcessPool()
        
        let jsurl = Bundle.main.url(forResource: "indexinapp1764336719128571.html", withExtension: nil, subdirectory: "public")!
        let request = URLRequest(url: jsurl)
        
        let configHost = WKWebViewConfiguration()
        configHost.processPool = dhypeProcessPool
        jsWebView = WKWebView(frame: CGRect(x: 0
            , y: 0
            , width: 0
            , height: 0), configuration: configHost)
        jsWebView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        jsWebView.configuration.userContentController.add(self,name:"consolelog")
        jsWebView.configuration.userContentController.add(self,name:"populatedrawer")
        jsWebView.configuration.userContentController.add(self,name:"loadpage")
        jsWebView.configuration.userContentController.add(self,name:"reccardsadaptor")
        jsWebView.configuration.userContentController.add(self,name:"returnreccards")
        jsWebView.configuration.userContentController.add(self,name:"darkentorequestpermission")
        jsWebView.configuration.userContentController.add(self,name:"splitviewgohome")
        jsWebView.navigationDelegate = self
        self.view.addSubview(jsWebView)
        self.view.sendSubviewToBack(jsWebView)
        
        let guesturl = Bundle.main.url(forResource: "splashinapp1764336719128571.html", withExtension: nil, subdirectory: "public")!
        let guestrequest = URLRequest(url: guesturl)
        
        let configGuest = WKWebViewConfiguration()
        configGuest.processPool = dhypeProcessPool
        guestWebView = WKWebView(frame: CGRect(x: 0
            , y: 0
            , width: self.view.frame.width
            , height: self.view.frame.height), configuration: configGuest)
        guestWebView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        guestWebView.configuration.userContentController.add(self,name:"goto")
        guestWebView.configuration.userContentController.add(self,name:"load")
        guestWebView.configuration.userContentController.add(self,name:"consolelog")
        guestWebView.configuration.userContentController.add(self,name:"reccardsadaptor")
        guestWebView.configuration.userContentController.add(self,name:"firebaselogin")
        guestWebView.configuration.userContentController.add(self,name:"loaded")
        guestWebView.configuration.userContentController.add(self,name:"allowpermission")
        guestWebView.configuration.userContentController.add(self,name:"callAllApps")
        guestWebView.navigationDelegate = self
        guestWebView.allowsBackForwardNavigationGestures = true
        
        self.view.addSubview(guestWebView)
        
        if UIApplication.shared.statusBarOrientation.isLandscape {
            // activate landscape changes
            jsWebView.frame = CGRect(x: 0, y: 0, width: (self.view.frame.width/3), height: (self.view.frame.height))
            guestWebView.frame = CGRect(x: (self.view.frame.width/3), y: 0, width: (2*self.view.frame.width/3), height: (self.view.frame.height))
        } else if UIScreen.main.traitCollection.userInterfaceIdiom == .pad {
            jsWebView.frame = CGRect(x: 0, y: 0, width: (self.view.frame.width/3), height: (self.view.frame.height))
            guestWebView.frame = CGRect(x: (self.view.frame.width/3), y: 0, width: (2*self.view.frame.width/3), height: (self.view.frame.height))
        } else {
            // activate portrait changes
            jsWebView.frame = CGRect(x: 0, y: 0, width: 0, height: 0)
            guestWebView.frame = CGRect(x: 0, y: 0, width: self.view.frame.width, height: self.view.frame.height)
        }
        
        jsWebView.load(request)
        guestWebView.load(guestrequest)
    }
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if let url = navigationAction.request.url?.lastPathComponent{
            if(url == "splashinapp1764336719128571.html"){
                decisionHandler(.allow)
            } else if (url == "indexinapp1764336719128571.html"){
                decisionHandler(.allow)
            } else if (url == "homeinapp1764336719128571.html"){
                guestWebView.allowsBackForwardNavigationGestures = false
//                guestWebView.backForwardList.perform(Selector(("_removeAllItems")))
                decisionHandler(.allow)
            } else if (url == "blankinapp1764336719128571.html"){
                if(UIApplication.shared.statusBarOrientation.isPortrait){
                    guestWebView.allowsBackForwardNavigationGestures = true
                }
                decisionHandler(.allow)
            } else if (navigationAction.request.url!.absoluteString == "about:blank"){
                decisionHandler(.allow)
            } else if (url == ".lp"){
                decisionHandler(.allow)
            } else {
                jsWebView.evaluateJavaScript("gotopage('"+url+"')", completionHandler: nil)
                decisionHandler(.cancel)
            }
        }
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        if (guestWebView.url!.lastPathComponent == "blankinapp1764336719128571.html" && loading == true){
//            guestWebView.load(URLRequest(url: URL(string: "about:blank")!))
            let url = Bundle.main.url(forResource: "blankinapp1764336719128571.html", withExtension: nil, subdirectory: "public")!
            guestWebView.loadHTMLString(html, baseURL: url)
            guestWebView.evaluateJavaScript("startObserving()", completionHandler: nil)
        } else if (guestWebView.url!.lastPathComponent == "homeinapp1764336719128571.html" && UIScreen.main.traitCollection.userInterfaceIdiom == .pad){
            guestWebView.evaluateJavaScript("ipadhome()", completionHandler: nil)
        } else if (guestWebView.url!.lastPathComponent == "homeinapp1764336719128571.html" && UIApplication.shared.statusBarOrientation.isLandscape){
            guestWebView.evaluateJavaScript("ipadhome()", completionHandler: nil)
        }
        loading = false
    }
    
    override func willTransition(to newCollection: UITraitCollection, with coordinator: UIViewControllerTransitionCoordinator) {
        coordinator.animate(alongsideTransition: { context in
            if UIApplication.shared.statusBarOrientation.isLandscape {
                // activate landscape changes
                jsWebView.frame = CGRect(x: 0, y: 0, width: (self.view.frame.width/3), height: (self.view.frame.height))
                guestWebView.frame = CGRect(x: (self.view.frame.width/3), y: 0, width: (2*self.view.frame.width/3), height: (self.view.frame.height))
                if(guestWebView.url!.lastPathComponent == "homeinapp1764336719128571.html"){
                    guestWebView.evaluateJavaScript("ipadhome()", completionHandler: nil)
                }
            } else if UIScreen.main.traitCollection.userInterfaceIdiom == .pad {
                jsWebView.frame = CGRect(x: 0, y: 0, width: (self.view.frame.width/3), height: (self.view.frame.height))
                guestWebView.frame = CGRect(x: (self.view.frame.width/3), y: 0, width: (2*self.view.frame.width/3), height: (self.view.frame.height))
            } else {
                // activate portrait changes
                if(guestWebView.url!.lastPathComponent == "homeinapp1764336719128571.html"){
                    guestWebView.evaluateJavaScript("backtoportrait()", completionHandler: nil)
                }
                jsWebView.frame = CGRect(x: 0, y: 0, width: 0, height: 0)
                guestWebView.frame = CGRect(x: 0, y: 0, width: self.view.frame.width, height: self.view.frame.height)
            }
        })
    }
}

