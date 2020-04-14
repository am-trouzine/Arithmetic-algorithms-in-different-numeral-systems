/*
	Arithmetic algorithms in different numeral systems
	A work in progress
	TROUZINE Abderrezak <am.trouzie@gmail.com>
	Free for home personal use
	14/04/2020
*/

var Err= ['unknown base',
'argument is not a number',
'found more than one decimal character',
'digit not in base',
'division by zero'
]

var Digits, digits;
setDigits()
function setDigits(x){
  if(typeof x=='undefined'){
    Digits ='';
    [ [48,57], [65,90], [97,123], [125,125], [192,383] ].forEach(function(e){
      for(var i=e[0]; i<=e[1];i++) Digits += String.fromCharCode(i)
    })
    digits={}
    for(var i=0; i< Digits .length; i++){
      digits [ Digits [i] ]=i
    }
    return
  }
  if(typeof x != 'string') throw 'string expected'
  if(x.length <2) throw 'at least two digits expected'
  var a= x.split('').sort()
  for(var i=0; i<a.length-1; i++){
    if(a[i]==a[i+1]) throw 'digits must be unique'
  }
  for(var i=0; i<x.length; i++){
    if(x[i]=='+' || x[i]=='-' || x[i]==' ' || x[i]=='.' ) throw 'reserved character'
  }
  Digits=x;
  digits={}
  for(var i=0; i< Digits .length; i++){
    digits [ Digits [i] ]=i
  }
  
}
function Fig(x, z){
  x=x.toString();
  var y='';
  var f='0123456789'.split('')
  
  for(var i=0; i<x.length; i++){
    y+=z? (digits[x[i]]? digits[x[i]]:x[i]==Digits[0]? '0' :x[i] ) : (f[ x[i] ] ? Digits[ x[i] ] : x[i])
  }
  return y;
}

function Abs(x){}

function Lon(x, B){
  B=B?Number(B):10
  switch(typeof x){
  case 'boolean':
    x=Fig(x .toString()) ; break;
  case 'number':
    if(isNaN(x)) throw Err [1]
    x=Fig(x .toString()) ; break;
  case 'string':
    x=x?x: Digits[0] ;// warning!
    break;
  default: throw Err [1]
  }
  
  if( isNaN(B)|| B<2||B> Digits.length ) throw Err[0] +'; Lon('+x+', '+B+')';
  for(var i=0; i<x.length;i++){
    if(digits[x[i]]==undefined || digits[x[i]]>=B ) throw Err[ 3] +'; Lon('+x+', '+B+'); '+ x[i]
  }
  while( x.length>1 && x.substr(0,1)== Digits[0] ) x=x.substr(1);
  return x;
}

function mEq(x,y , B){
  B=B?B:10;
  x= Lon(x , B ); y= Lon(y, B);
  if( x.length != y.length){
    return false;
  }
  for(var i=0; i<x.length; i++){
    if(x.substr(i,1) != y.substr(i,1)) return false;
  }
  return true;
}

function mGt(x,y , B){
  B=B?B:10;
  x= Lon(x , B ); y= Lon(y, B);
  if( x.length != y.length){
    return x.length>y.length?true:false;
  }
  for(var i=0; i<x.length; i++){
    if(x.substr(i,1) == y.substr(i,1)) continue;
    if( digits[x.substr(i,1)] < digits[y.substr(i,1)] ) return false;
    if( digits[x.substr(i,1)] > digits[y.substr(i,1)] ) return true;
  }
  return false //==;
}
function mLt(x,y , B){
  B=B?B:10;
  x= Lon(x , B ); y= Lon(y, B);
  if( x.length != y.length){
    return x.length<y.length?true:false;
  }
  for(var i=0; i<x.length; i++){
    if(x.substr(i,1) == y.substr(i,1)) continue;
    if( digits[x.substr(i,1)] > digits[y.substr(i,1)] ) return false;
    if( digits[x.substr(i,1)] < digits[y.substr(i,1)] ) return true;
  }
  return false //==;
}
function mGtE(x,y , B){
  B=B?B:10;
  x= Lon(x , B ); y= Lon(y, B);
  if( x.length != y.length){
    return x.length>y.length?true:false;
  }
  for(var i=0; i<x.length; i++){
    if(x.substr(i,1) == y.substr(i,1)) continue;
    if( digits[x.substr(i,1)] < digits[y.substr(i,1)] ) return false;
    if( digits[x.substr(i,1)] > digits[y.substr(i,1)] ) return true;
  }
  return true //==;
}
function mLtE(x,y , B){
  B=B?B:10;
  x= Lon(x , B ); y= Lon(y, B);
  if( x.length != y.length){
    return x.length<y.length?true:false;
  }
  for(var i=0; i<x.length; i++){
    if(x.substr(i,1) == y.substr(i,1)) continue;
    if( digits[x.substr(i,1)] > digits[y.substr(i,1)] ) return false;
    if( digits[x.substr(i,1)] < digits[y.substr(i,1)] ) return true;
  }
  return true //==;
}

function Modulo(x, y, B){
  B=B?B:10;
  x= Lon(x , B ); y= Lon(y, B);
  if(mLt(x,y ,B )) return [x, Digits[0] ]
  if(mEq(x,y,B)) return [ Digits[0] , Digits[1] ];
  var D= Digits//Hh. substr(0,B).split('');
  var d= digits
  
  var h=[];
  var XX=''
  while(x.substr(-1)== Digits[0] && y.substr(-1)== Digits[0] ){
    x=x.substr(0, x.length-1);
    y=y.substr(0, y.length-1);
    XX+= Digits[0]
  }
  iX=''
  var q=[ Digits[0] ,y]; 
  for(var i= 2 ; i<B; i++){
    q.push( Mul(y,D[i], B) );
  }
  
  var n=''
  for(var i=0; i<x.length; i++){
    n+= x[i] ;
    
    if( mLt(n, y ,B ) ){
      h.push( Digits[0] );
    } else{
      for(var k=1; k<q.length; k++){
        if( mGt(q[k], n ,B ) ) break;
      }
      h.push( D[k-1] )
      
      n= Sub(n, q[k-1], B);
    }
    
  }//-while(x>=y)
  return [Lon(n +XX , B ), Lon(h.join('')+iX , B )/*, Mul(( h.join('')+iX +XX),y, B)*/ ];
  
}//-func

function Sub(x, y, B){
  B=B?B:10;
  x=Lon(x , B ); y=Lon(y , B );
  if( mEq(y, x,B) ) return Digits[0] ;
  if(x== Digits[0] || y== Digits[0] ) return x== Digits[0] ?y:x
  var a= mGt(x, y ,B ) ? x : y;
  var b= mEq(a, x ,B ) ? y : x;
  x=a; y=b;
  var D= Digits//Hh . substr(0,B).split('');
  var d= digits
  
  x=x.split(''); y= y.split('');
  var l= x.length<y.length?x.length:y.length
  var s=0;
  var I= x.length-1;var j= l;
  
  for(var i=I; i>x.length-1-l; i--){
    j--;
    var X= Number( d[ x[i] ] ); 
    var Y= Number( d[ y[j] ] ) +s; s=0;
    if(X> Y){
      x[i]=D[(X-Y)] ;
    } else if(X< Y){
      x[i]=D[(B+ X-Y)] ;
      s= 1;
    } else{
      x[i]=i==0?'': Digits[0]
    }
  }
  if(s){        
    for(var i=i; i>=0; i--){
      var X= Number( d[ x[i] ] ); 
      Y=s; s=0;
      if(X> Y){
        x[i]=D[(X-Y)] ;
      } else if(X< Y){
        x[i]=D[(B+ X-Y)] ;
        s= 1;
      } else{
        x[i]=i==0?'': Digits[0]
      }
      if(!s) {break;}
    }
  }
  if(s)x.unshift(s);
  x=x.join('')
  
  return Lon(x, B);//string
}

function P(x, y, B){
  //if y is base?
  B=B?B:10;
  x= Lon(x , B ); 
  y= Lon(y , B ); 
  if(y== Digits[0] ) return Digits[1] ;
  if(y== Digits[1] ) return x;
  //y= BToDec(y, B);//-->
  //y= y.toString();
  var IX=''
  /*while(x.substr(-1)== Digits[0] ){
IX+=Array(y*1+1).join( Digits[0] );
x=x.substr(0, x.length-1)
}*/
  var a= x;
  for(var i= Digits[2] ; mLtE(i,y ,B ) ; i=Add(i, Digits[1] , B)){// i<=y mLtE(i,y ,B )
    a= Mul(x, a, B)
  }
  return a+IX;
}

function execTime(f){
  var start = new Date().getTime();
  var a= f();
  var end = new Date().getTime();
  var time = end - start;
  console.log ('Execution time: ' + time);
  return a;
}

function BToB(x, B, b){//16:8
  b=b?Number(b):10
  var Y=b
  var fn=function(x){
    var r=0; var j=1;
    for (var i=x.length-1; i>-1; i--){
      r+= Fig( x[i], 1 )* j;
      j*=B;
    }
    return Digits[r]
  }
  
  x=Lon(x , B );
  if(b==B) return x
  if(x== Digits[0] ) return Digits[0] ;
  b=decToB( Fig(b), B )//df[b]
  //if(!b)return //warning
  var r=[], m= Modulo(x, b, B );
  r.unshift( m[0] );
  var s= m[1]
  while( mGtE(s, b ,B )){
    m= Modulo(s, b, B );
    r.unshift( m[0] );
    s= m[1]
  }
  if(s) { r.unshift( s );  };
  if( B < Y){
    r=r.map(fn)
  }
  return Lon(r. join(''), Y);
}

function decToB(x, B){
  x=Lon(x, 10);
  if(x== Digits[0] ) return Digits[0];
  //if(!B || B==1 || B==10) return x;
  
  var D= Digits, d=digits
  
  var r='', m= Modulo(x, Fig(B), 10);
  var q= m[0];
  r= D[ Fig(q, 1) ]+r;
  var s= m[1];
  
  while( mGtE(s, Fig(B) , 10)){
    m= Modulo(s, Fig(B) , 10);
    r= D[ Fig( m[0] ,1) ]+r;
    s= m[1];
  }
  if(s) {r= D[ Fig( s, 1) ] +r};
  return Lon(r, B);
}

function BToDec(x, B){
  B=B?B:10;
  x=Lon(x, B);
  if(B==10) return x
  var r= Digits[0] ;
  var j= x.length-1;
  
  for(var i= 0; i<x.length; i++){
    var k= digits [x[i]];
    var p= Mul( Fig(k), P( Fig(B), Fig(j) ) )
    r= Add(r, p);
    j--
  }
  return r;
}

function Add(x, y, B){
  B=B?B:10;
  x=Lon(x , B ); y=Lon(y , B );
  if(x== Digits[0] || y== Digits[0] ) return x== Digits[0] ?y:x
  var a= mGt(x, y ,B ) ? x : y;
  var b= mEq(a, x ,B ) ? y : x;
  x=a; y=b;
  
  var D= Digits
  var d= digits
  x=x.split('');
  var X = x.length-1;
  var Y = y.length-1;
  var j=0;
  for(var i= Y; i>=0; i--){
    var s =Number(d[x[X]])+ Number(d[y[Y]]);
    s+=j;
    var q= s%B;
    var j=(s-q)/B
    x[X] = D[q];
    X--; Y--
  }
  if(j){
    for(var i=X; i>=0; i--){
      var s =Number(d[x[i]])+j;
      var q= s%B;
      var j=(s-q)/B
      x[i] = D[q];
      if(!j) {break;}
    }
  }
  if(j)x.unshift(D[j]);
  x=x.join('')
  
  return Lon(x , B );//string
}

function Mul(x, y, B){
  B=B?B:10;
  x=Lon(x , B ); y=Lon(y , B );
  if(x== Digits[0] || y==Digits[0]) return Digits[0] ;
  var IX=''
  while(x.substr(-1)== Digits[0] ){
    IX+= Digits[0] ;
    x=x.substr(0, x.length-1)
  }
  while(y.substr(-1)== Digits[0] ){
    IX+= Digits[0] ;
    y=y.substr(0, y.length-1)
  }
  
  if(x== Digits[1] || y== Digits[1] ) return (x== Digits[1] ?y:x)+IX
  var D= Digits
  var d= digits
  
  var h=0; var z=''
  for(var i= x.length-1; i>=0; i--){
    var r =''; var j=0;
    for(var k= y.length-1; k>=0; k--){
      var s =Number(d[x[i]])* Number (d[y[k]]);
      s+=j;
      var q= s%B;
      var j=(s-q)/B
      r=( D[q] )+r
    }
    if(j!=0) r= ( D[j] )+r
    h=Add(h, r+z, B)
    z+= Digits[0]
  }
  return h+IX;// Lon ??
}

function pow(x, y, B){
  //note that (-9^-2) = (1/-9^2 )
  B=B?Number(B):10
  if( ( x=lon(x,B) )[0]==0 ) throw Err[ x[1]]+': '+x
  if( ( y=lon(y,B) )[0]==0 ) throw Err[ y[1]] +': '+y
  var X=(x[0]==1?'':'-')+x[1]+(x[2]?'.'+x[2]:'');
  var Y=(y[0]==1?'':'-')+y[1]+(y[2]?'.'+y[2]:'');
  if(Y==0) return '1'
  if(X==0) return '0'// need observation when x=y=0
  if(y[0]==-1){
    if(Y==-1) return  div(1,X, B)
    if(y[2]){
      throw 'not handled yet'
    }
    return div(1, pow(X, Y.substr(1), B), B)
  }
  if(Y==1) return  X
  
  y= BToDec(Y, B);
  var a= X;
  for(var i=2; mLtE(i,y ,B ) ; i++){// i<=y mLtE(i,y ,B )
    a= mul(X, a, B)
  }
  return a;
}

function mul(x,y,B){
  B=B?Number(B):10
  if( ( x=lon(x,B) )[0]==0 ) throw Err[ x[1]] +': mul(x:'+x+',  y:'+y+', B:'+B+')'
  if( ( y=lon(y,B) )[0]==0 ) throw Err[ y[1]] +': '+y
  var xs=x.splice(0,1)[0], ys=y.splice(0,1)[0], xp=x, yp= y;
  var p=(xp[1]?xp[1].length:0) + (yp[1]?yp[1].length:0);
  if(!p) return (xs*ys==1?'':'-') + Mul(x[0], y[0], B);
  var r=Mul(xp.join(''), yp.join(''), B);
  r=reDecs(r, p, B)
  r=(xs*ys==1?'':'-')+r;
  return r
}

function reDecs(r, p, B){
  while(p>r.length)r=Digits[0]+r
  r=[ Lon(r.substr(0, r.length-p), B), ( r.substr( r.length -p))]
  
  if(r[1].length>1) while(r[1].substr(-1)== Digits[0] )r[1]=r[1].substr(0,r[1].length-1)
  r=r[0]+(r[1]== Digits[0] ?'':'.'+r[1]);
  return r;
}

function add(x,y,B){
  B=B?Number(B):10
  if( ( x=lon(x,B) )[0]==0 ) throw Err[ x[1]]+': '+x+''
  if( ( y=lon(y,B) )[0]==0 ) throw Err[ y[1]] +': '+y
  var xs=x.splice(0,1)[0], ys=y.splice(0,1)[0], n= noDecs(x,y), xp=n[0], yp= n[1], p=n[2] ;
  var r= (xs*ys==1? Add:Sub)(xp.join(''), yp.join('') , B);
  if(r==0)return r
  r= (xs*ys==1 ?  (xs==1?'':'-') : mGt(xp.join(''),yp .join('') ,B )? (xs==1?'':'-') : (ys ==1?'':'-') ) +(div (r, P(10,p,B ), B ));
  
  return r
}

function sub(x,y,B){
  return add(x, '-'+y, B)
}
function div(x, y, B, V){
  B=B?Number(B):10
  V=V?Number(V):16;
  if( ( x=lon(x,B) )[0]==0 ) throw Err[ x[1]] +': '+x
  if( ( y=lon(y,B) )[0]==0 ) throw Err[ y[1]] +': '+y
  if( y[1] + y[2] == Fig(0)) throw Err[4] +': '+y
  var xs=x.splice(0,1)[0], ys=y.splice(0,1)[0], n= noDecs(x,y), xp=n[0], yp= n[1], p=n[2] ;
  
  var R='', r='' , X= xp.join(''), Y= yp.join('');
  var s= Modulo(X, Y, B)
  R=s[1]
  while( !mEq(s[0], Fig(0) ,B ) && r.length<V){
    s= Modulo( Mul(s[0], Fig('10'), B), Y, B )
    r+=s[1]
  }
  return ( xs*ys==1?'':'-' )+R+(r?'.'+r:'')
}

function lon(x, B){
  B=B?Number(B):10
  if( isNaN(B)|| B<2||B> Digits.length ) return [0, 0];
  switch(typeof x){
  case 'boolean':
    x=Fig(x .toString()) ; break;
  case 'number':
    if(isNaN(x)) return [0,1] // throw Err [1]
    x=Fig(x .toString()) ; break;
  case 'string':
    //x=x?x: Digits[0] ;// warning!
    break;
  default: return [0,1] // throw Err [1]
  }
  
  var xs= 1;
  while(x.substr(0,1)=='+'||x.substr(0,1)=='-'){
    xs*=(x.substr(0,1)+1)
    x=x.substr(1);
  }
  var xp=x.split('.');
  if(xp.length>2) return [0,2];
  var X=xp.join('')
  for(var i=0; i<X.length;i++){
    if(digits[X[i]]==undefined || digits[X[i]]>=B) return [0,3]
  }
  xp[0]= xp[0]? Lon( xp[0], B ) : Digits[0]
  xp[1]= xp[1] ? xp[1]:''
  
  while( xp[1] .substr(-1)== Digits[0] ) xp[1]= xp[1].substr(0, xp[1].length-1 )
  if(xp[0]+xp[1]== Digits[0] ) xs=1;
  return [xs, xp[0], xp[1] ];
}
function bToB(x, b, B){
  b= Number(b)
  B=B?Number(B):10;
  if( isNaN(B)|| B<2||B> Digits.length ) throw Err[0] +': bToB('+arguments+')'
  if( ( x=lon(x,b) )[0]==0 ) throw Err[ x[1]] +': ' +': bToB('+arguments+')'
  
  var r= BToB(x[1]+x[2], b, B);
  
  return ( x[0] ==1?'':'-') + div(r,BToB(P(10,x[2].length),b,B ),B /*, x[2].length*/)
}
function modulo(x, y, B){
  B=B?Number(B):10
  if( ( x=lon(x,B) )[0]==0 ) throw Err[ x[1]]+': '+x+''
  if( ( y=lon(y,B) )[0]==0 ) throw Err[ y[1]] +': '+y
  if( y[1] + y[2] == 0) throw Err[4] +': '+y
  var xs=x.splice(0,1)[0], ys=y.splice(0,1)[0], n= noDecs(x,y), xp=n[0], yp= n[1], p=n[2] ;
  
  var m=Modulo(xp.join(''),  yp.join('') , B);
  return [ div( m[0] ,P(10,p,B),B ) , (xs*ys==1?'':'-')+m[1]]
}

function noDecs(x, y){//[],[nat,dec]
  if(!x && !x.sort && !(x.length==2) || !y && !y.sort && !(y.length==2)) throw 'unexpected argument(s) in noDecs: '+x+'; '+y;
  
  var xp=x, yp=y;
  var p= xp[1]?yp[1]?xp[1].length> yp[1].length?xp[1].length: yp[1].length: xp[1].length: yp[1]?yp[1].length :0;
  while( xp[1].length <p){
    xp[1]+= Digits[0]
  }
  while( yp[1].length <p){
    yp[1]+= Digits[0]
  }
  return [xp, yp, p]
  
}
function _pow(x,y){
  return bToB( P(10,y), x)
}
function oneDiv(x){
  return bToB( div(1,10), x) 
}

function eq(x,y ,B ){
  x=lon(x, B); y=lon(y, B); 
  
  var xs=ys= 1;
  while(x.substr(0,1)=='+'||x.substr(0,1)=='-'){
    xs*=(x.substr(0,1)+1)
    x=x.substr(1);
  }
  while(y.substr(0,1)=='+'||y.substr(0,1)=='-'){
    ys*=(y.substr(0,1)+1)
    y=y.substr(1);
  }
  if( xs*ys==-1 ) return false
  var xp=x.split('.'), yp=y.split('.');
  if(xp.length>2 || yp.length>2) {
    console.log( 'Error',xp,yp )
    return 'Error';
  }
  var p= xp[1]?yp[1]?xp[1].length> yp[1].length?xp[1].length: yp[1].length: xp[1].length: yp[1]?yp[1].length :0;
  xp[1]=xp[1] ? xp[1] : ''
  yp[1]=yp[1] ? yp[1] : ''
  while( xp[1].length <p){
    xp[1]+='0'
  }
  while( yp[1].length <p){
    yp[1]+='0'
  }
  return mEq(xp.join(''), yp.join('') ,B )
}

function gt(x,y, B){
  x=lon(x , B ); y=lon(y, B); 
  
  var xs=ys= 1;
  while(x.substr(0,1)=='+'||x.substr(0,1)=='-'){
    xs*=(x.substr(0,1)+1)
    x=x.substr(1);
  }
  while(y.substr(0,1)=='+'||y.substr(0,1)=='-'){
    ys*=(y.substr(0,1)+1)
    y=y.substr(1);
  }
  if( xs*ys==-1 ) return xs==1?true:false
  var xp=x.split('.'), yp=y.split('.');
  if(xp.length>2 || yp.length>2) {
    console.log( 'Error',xp,yp )
    return 'Error';
  }
  var p= xp[1]?yp[1]?xp[1].length> yp[1].length?xp[1].length: yp[1].length: xp[1].length: yp[1]?yp[1].length :0;
  xp[1]=xp[1] ? xp[1] : ''
  yp[1]=yp[1] ? yp[1] : ''
  while( xp[1].length <p){
    xp[1]+='0'
  }
  while( yp[1].length <p){
    yp[1]+='0'
  }
  return xs==1?mGt(xp.join(''), yp.join('') ): mLt(xp.join(''), yp.join('') ,B )
}
function gte(x,y,B){
  x=lon(x , B ); y=lon(y , B ); 
  
  var xs=ys= 1;
  while(x.substr(0,1)=='+'||x.substr(0,1)=='-'){
    xs*=(x.substr(0,1)+1)
    x=x.substr(1);
  }
  while(y.substr(0,1)=='+'||y.substr(0,1)=='-'){
    ys*=(y.substr(0,1)+1)
    y=y.substr(1);
  }
  if( xs*ys==-1 ) return xs==1?true:false
  var xp=x.split('.'), yp=y.split('.');
  if(xp.length>2 || yp.length>2) {
    console.log( 'Error',xp,yp )
    return 'Error';
  }
  var p= xp[1]?yp[1]?xp[1].length> yp[1].length?xp[1].length: yp[1].length: xp[1].length: yp[1]?yp[1].length :0;
  xp[1]=xp[1] ? xp[1] : ''
  yp[1]=yp[1] ? yp[1] : ''
  while( xp[1].length <p){
    xp[1]+='0'
  }
  while( yp[1].length <p){
    yp[1]+='0'
  }
  return xs==1?mGtE(xp.join(''), yp.join('') ): mLtE(xp.join(''), yp.join(''), B )
}

function lt(x,y , B ){
  x=lon(x , B ); y=lon(y , B ); 
  
  var xs=ys= 1;
  while(x.substr(0,1)=='+'||x.substr(0,1)=='-'){
    xs*=(x.substr(0,1)+1)
    x=x.substr(1);
  }
  while(y.substr(0,1)=='+'||y.substr(0,1)=='-'){
    ys*=(y.substr(0,1)+1)
    y=y.substr(1);
  }
  if( xs*ys==-1 ) return xs==1? false: true
  var xp=x.split('.'), yp=y.split('.');
  if(xp.length>2 || yp.length>2) {
    console.log( 'Error',xp,yp )
    return 'Error';
  }
  var p= xp[1]?yp[1]?xp[1].length> yp[1].length?xp[1].length: yp[1].length: xp[1].length: yp[1]?yp[1].length :0;
  xp[1]=xp[1] ? xp[1] : ''
  yp[1]=yp[1] ? yp[1] : ''
  while( xp[1].length <p){
    xp[1]+='0'
  }
  while( yp[1].length <p){
    yp[1]+='0'
  }
  return xs==1?mLt(xp.join(''), yp.join('') ,B ): mGt(xp.join(''), yp.join('') )
}
function lte(x,y,B){
  x=lon(x , B ); y=lon(y , B ); 
  
  var xs=ys= 1;
  while(x.substr(0,1)=='+'||x.substr(0,1)=='-'){
    xs*=(x.substr(0,1)+1)
    x=x.substr(1);
  }
  while(y.substr(0,1)=='+'||y.substr(0,1)=='-'){
    ys*=(y.substr(0,1)+1)
    y=y.substr(1);
  }
  if( xs*ys==-1 ) return xs==1? false: true
  var xp=x.split('.'), yp=y.split('.');
  if(xp.length>2 || yp.length>2) {
    console.log( 'Error',xp,yp )
    return 'Error';
  }
  var p= xp[1]?yp[1]?xp[1].length> yp[1].length?xp[1].length: yp[1].length: xp[1].length: yp[1]?yp[1].length :0;
  xp[1]=xp[1] ? xp[1] : ''
  yp[1]=yp[1] ? yp[1] : ''
  while( xp[1].length <p){
    xp[1]+='0'
  }
  while( yp[1].length <p){
    yp[1]+='0'
  }
  return xs==1?mLtE(xp.join(''), yp.join('') ,B ): mGtE(xp.join(''), yp.join('') )
}

function R(x, B, V){
  var N= BToB(Digits[2], 10, B);
  var fn = function (x){
    var a=x, j=Digits[0];
    
    for(var i=x; mGtE(i, Digits[1], B); i=Sub(i, Digits[1], B) ){
      j=Add(j, Digits[1], B)
      a=sub(a, Add(Mul(N, Sub(x, i, B), B ), Digits[1],B), B);
      if(a== Digits[0] ) return j
      if(a.substr(0, 1)=='-' ) return Sub(j, Digits[1], B )
    }
    return a
  }
  B=B?B:10
  x= Lon(x , B );
  V=V?V:16
  var y= fn(x)
  for(var i=y; mGtE(i, Fig(1) ,B ); i=Sub(i, Fig(1) ,B )){
    var w= Mul(i,i, B)
    if( mLtE(w,x ,B ) ){
      var m=Sub(x,w, B)
      break;
    }
  }
  if(m==Fig(0)) return i
  var a=m, c=Mul(i, N, B)
  var t=i+'.';
  for(var j=0; j<V; j++){
    a=a+Digits[0]+ Digits[0] 
    c=c+ Digits[0] 
    var b=Modulo(a,c, B)
    var s=Mul(b[1],b[1], B)
    while(mGt(s, b[0] ,B ) ){
      b[0]=Add(b[0], c, B);
      b[1]=Sub(b[1], Fig(1), B);
      s=Mul(b[1],b[1], B)
      //break;
    }
    t+=b[1]
    
    var z= Sub(b[0], s, B)
    c=Add(c, Mul(b[1], N, B ), B )
    a=z
  }
  return t
}

function Q(x, B, V){
  B=B?Number(B):10;
  V=V?Number(V):16;
  x=Lon(x, B);
  var N=BToB(Digits[2], 10, B), T=BToB(Digits[3], 10, B);
  
  var fn =function (x){
    var j=Digits[0];
    var a=x
    for(var i=Digits[1]; mLtE(i,x, B); i=Add(i, Digits[1], B)){
      j=Add(j, Digits[1], B);
      var f0= Mul(T,P(i, N, B),B)
      var f1= Mul(T,i,B)
      var f2= Add(Sub(f0,f1,B),Digits[1], B)
      a=sub(a, f2, B)
      if(a==Digits[0])return [j, Digits[0]]
      if(a.substr(0,1)=='-')return [Sub(j, Digits[1], B), add(a,f2, B)]
    }
    return [Digits[0], j]
  }
  
  var a=fn(x); 
  
  var z= a[1]
  x= a[0]
  if(z==Digits[0]) return x;
  var t=a[0]+'.'
  for(var i=0; i<V; i++){
    z=z+Digits[0]+Digits[0]+Digits[0]
    x+=Digits[0]
    for(var j=Fig(0); mLt(j,Fig(10),B); j=Add(j, Fig(1), B)){
      var f0= Mul(T, P(x, N, B), B)
      var f1= Mul(T, x, B)
      var p= Add(Add(f0,f1,B),Digits[1], B)
      
      x=Add(x, Fig(1), B)
      z=sub(z, p, B)
      if(z.substr(0,1)=='-'){
        z=add(z, p, B);
        x=Sub(x, Fig(1), B);
        t+=j;
        break
      }
    }
    
  }
  return t
}

function Newton(a, b, n){
  var F=function(x){
    if(x==0 || x==1)return 1;
    var a=1;
    for(var i=2; i<=x; i++){
      a*=i
    }
    return a
  }
  var C= function(k, n){
    return F(n)/(F(k)*F(n-k))
  }
  var x=[]
  for(var k=0; k<=n; k++){
    x.push([C(k,n)*Math.pow(a,n-k)*Math.pow(b,k), n-k])
  }
  return x
}
function PolyMul(x, y){
  var a=[]
  for(var i=0; i<x.length; i++){
    for(var j=0; j<y.length; j++){
      a.push([x[i][0]*y[j][0], x[i][1]+y[j][1]])
    }
  }
  for(var i=0; i<a.length-1; i++){
    for(var j=i+1; j<a.length; j++){
      if(a[i][1]==a[j][1]){
        a[i][0]+=a[j][0]; a.splice(j, 1);  j--
      }
    }
  }
  return a.sort(function(x,y){return x[1]>y[1]?1:0})
}
function PolyAdd(a, y){
  for(var i=0; i<y.length; i++){
    a.push(y[i])
  }
  for(var i=0; i<a.length-1; i++){
    for(var j=i+1; j<a.length; j++){
      if(a[i][1]==a[j][1]){
        a[i][0]+=a[j][0]; a.splice(j, 1);  j--
      }
    }
  }
  return a.sort(function(x,y){return x[1]>y[1]?1:0})
  
}
function PowSeq(x){
  var a= [[[1,0]]]
  for(var i=1; i<x; i++){
    for(var j=0; j<a.length; j++){
      a[j]=PolyMul(a[j], [[1,1],[-1,0]])
    }
    a.push([[1,i]])
  }
  var b=[[0,0]];
  for(var i=0; i<a.length; i++){
    b=PolyAdd(b, a[i])
  }
  return b.sort(function(x,y){return x[1]<y[1]?1:-1})
}
function RSeq(x){
  var a= [[[1,0]]]
  for(var i=1; i<x; i++){
    for(var j=0; j<a.length; j++){
      a[j]=PolyMul(a[j], [[1,1],[+1,0]])
    }
    a.push([[1,i]])
  }
  var b=[[0,0]];
  for(var i=0; i<a.length; i++){
    b=PolyAdd(b, a[i])
  }
  return b.sort(function(x,y){return x[1]<y[1]?1:-1})
}

function NRoot(x, y, B, V){
  B=B?Number(B):10;
  V=V?Number(V):16;
  x=Lon(x, B);
  
  var p=PowSeq(y)
  var r=RSeq(y)
  
  var fn =function (x){
    var j=Digits[0];
    var a=x
    for(var i=Digits[1]; mLtE(i,x, B); i=Add(i, Digits[1], B)){
      j=Add(j, Digits[1], B);
      
      var c=Digits[0]
      for(var k=0; k<p.length; k++){
        c=add(c, mul(p[k][0], P(i,p[k][1],B), B), B)
      }
      a=sub(a, c /*f2*/, B)
      if(a==Digits[0])return [j, Digits[0]]
      if(a.substr(0,1)=='-')return [Sub(j, Digits[1], B), add(a, c /*f2*/, B)]
    }
    return [Digits[0], j]
  }
  
  var a=fn(x); 
  
  var z= a[1]
  x= a[0]
  if(z==Digits[0]) return x;
  var t=a[0]+'.'
  for(var i=0; i<V; i++){
    z+=Array(y+1).join(Digits[0])
    x+=Digits[0]
    for(var j=Fig(0); mLt(j,Fig(10),B); j=Add(j, Fig(1), B)){
      var c=Digits[0]
      for(var k=0; k<r.length; k++){
        c=add(c, mul(r[k][0], P(x,r[k][1],B), B), B)
      }
      x=Add(x, Digits[1], B)
      z=sub(z, c/*p*/, B)
      if(z.substr(0,1)=='-'){
        z=add(z, c/*p*/, B);
        x=Sub(x, Digits[1], B);
        t+=j;
        break
      }
    }
  }
  return t
}

function Mod(x, b, y){
  x=Lon(x);y= Digits [y]
  var q=[0];
  for(var i=1; i< b; i++){
    q.push( Mul( Digits [i] , y, b) );
  }
  //console.log(q+'')
  
  function fn(x){
    var r, s
    r =[];
    s=''
    for (var p=0; p<x.length;p++){
      s+=x[p];
      for(var i=0; i<q.length; i++){
        if(mGt(q[i],s)){
          break;
        }
      }
      r.push( Digits[i-1] );
      k=Sub(s, q[i-1], b);
      s=k;
    }
    return mLt( r.join('') ,y)? r.join('')+s: fn( r.join('') )+s
  }
  return Lon(fn(x))
  
}

function p2(x){
  var a=0
  for(var i=1;i<=x;i++)a+=(2*(x-i))+1
  return a
}

function PolyXAdd(x, y){
  var X=[]
  for(var i=0; i<x.length; i++){
    X.push(x[i])
  }
  for(var i=0; i<y.length; i++){
    X.push(y[i])
  }
  for(var i=0; i<X.length; i++){
    var s=1, n='';
    while( ['-','+'].indexOf(X[i].substr(0,1))!=-1 ) {
      s=s*(X[i].substr(0,1)=='+'?1:-1)
      X[i]=X[i].substr(1)
    }
    while('0123456789'.split('').indexOf(X[i].substr(0,1))!=-1 ) {
      n+=X[i].substr(0,1)
      X[i]=X[i].substr(1)
    }
    n=n==''?1:Number(n);
    X[i]={s:s, n:n, x:X[i]}
  }
  var z=[];
  //for(var i=0; i<x.length-1; i++){
  while(X.length){
    var y=X.splice(0,1)[0];
    for(var j=0; j<X.length; j++){
      if(y['x']==X[j]['x']){
        var v=y['s']*y['n']+X[j]['s']*X[j]['n']
        y['s']=v>=0?1:-1;
        y['n']=Math.abs(v);
        X.splice(j,1);
        j--;
      } //else {;break}
    }
    z.push(
    (y['s']==1?'+':'-')+
    (y['n'])+
    y['x']//format(x[i]['x'])
    )
  }
  return z
}

function PolyXMul(x, y, fo){
  var fn=function(x){
    var X=[];
    var sup=['²','³','⁴'];
    for(var i=0; i<x.length; i++){
      var f=x[i].split('')
      for(var j=0; j<f.length; j++){
        if(sup.indexOf(f[j])!=-1){
          f[j-1]=f[j-1].repeat( sup.indexOf(f[j])+2);
          f.splice(j,1); j--;
        }
      }
      f=f.join('')
      var s=1, n='';
      while( ['-','+'].indexOf(f.substr(0,1))!=-1 ) {
        s=s*(f.substr(0,1)=='+'?1:-1)
        f=f.substr(1)
      }
      while('0123456789'.split('').indexOf(f.substr(0,1))!=-1 ) {
        n+=f.substr(0,1)
        f=f.substr(1)
      }
      n=n==''?1:Number(n);
      X.push({s:s, n:n, x:f})
    }
    return X;
  }
  var X=fn(x), Y=fn(y)
  var z=[];
  for(var i=0; i<X.length; i++){
    for(var j=0; j<Y.length; j++){
      z.push(
      (X[i]['s']*Y[j]['s']==1?'+':'-')+
      (X[i]['n']*Y[j]['n'])+
      ( fo? format (X[i]['x']+Y[j]['x']): (X[i]['x']+Y[j]['x']) ) // format
      )
    }
  }
  return z
}

function format(x){
  var m=x.split('').sort();
  var M='';
  while(m.length){
    var t=1, u=m.splice(0,1)[0];
    for(var l=0; l<m.length; l++){
      if(u==m[l]){
        t+=1
        m.splice(l,1);
        l--
      }else {break}
    }
    if(t==1){M+=u}else{
      //t==1?'¹':
      M+=u+(t==2?'²':t==3?'³':t==4?'⁴':'^'+t)
    }
  }
  return M;
}
